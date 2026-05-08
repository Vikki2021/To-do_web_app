// Notion API fetcher. Server-only.
import 'server-only';
import { env, sources } from './env';
import type { ActivityEvent, FestivalEvent } from '@/data/mock';

const REVAL = 60;
const API = 'https://api.notion.com/v1';
const VERSION = '2022-06-28';

type DbQuery<P> = {
  results: { id: string; properties: P }[];
};

async function notionQuery<P>(dbId: string, body: object = {}): Promise<DbQuery<P> | null> {
  if (!env.notion.token) return null;
  try {
    const res = await fetch(`${API}/databases/${dbId}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.notion.token}`,
        'Notion-Version': VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      next: { revalidate: REVAL },
    });
    if (!res.ok) {
      console.warn(`[notion] HTTP ${res.status} on db ${dbId}`);
      return null;
    }
    return (await res.json()) as DbQuery<P>;
  } catch (err) {
    console.warn('[notion] fetch failed:', err);
    return null;
  }
}

// ---------- Festival Calendar ----------

type FestivalProps = {
  Name?: { title: { plain_text: string }[] };
  Date?: { date: { start: string } | null };
  Window?: { select: { name: string } | null };
  'Pillar Product Types'?: { multi_select: { name: string }[] };
};

export async function getNotionFestivalCalendar(now = new Date()): Promise<FestivalEvent[] | null> {
  if (!sources.notion.festival) return null;
  const data = await notionQuery<FestivalProps>(env.notion.festivalDb!, {
    filter: {
      property: 'Date',
      date: { on_or_after: now.toISOString().slice(0, 10) },
    },
    sorts: [{ property: 'Date', direction: 'ascending' }],
    page_size: 6,
  });
  if (!data) return null;
  return data.results
    .map((row): FestivalEvent | null => {
      const name = row.properties.Name?.title?.[0]?.plain_text ?? '';
      const date = row.properties.Date?.date?.start ?? null;
      const window = row.properties.Window?.select?.name ?? 'T-7';
      const types = row.properties['Pillar Product Types']?.multi_select?.map((m) => m.name).join(', ') ?? '';
      if (!name || !date) return null;
      return {
        date,
        name,
        pillarTypes: types,
        prep: window as FestivalEvent['prep'],
      };
    })
    .filter((x): x is FestivalEvent => x !== null);
}

// ---------- Daily Standup activity feed ----------

type StandupProps = {
  Date?: { date: { start: string } | null };
  Decisions?: { rich_text: { plain_text: string }[] };
  Blockers?: { rich_text: { plain_text: string }[] };
};

export async function getNotionActivityFeed(): Promise<ActivityEvent[] | null> {
  if (!sources.notion.standup) return null;
  const data = await notionQuery<StandupProps>(env.notion.dailyStandupDb!, {
    sorts: [{ property: 'Date', direction: 'descending' }],
    page_size: 8,
  });
  if (!data) return null;
  const events: ActivityEvent[] = [];
  for (const row of data.results) {
    const date = row.properties.Date?.date?.start;
    const decisions = row.properties.Decisions?.rich_text?.map((r) => r.plain_text).join(' ') ?? '';
    const blockers = row.properties.Blockers?.rich_text?.map((r) => r.plain_text).join(' ') ?? '';
    if (!date) continue;
    if (decisions) {
      events.push({
        ts: `${date}T09:30:00+05:30`,
        agent: 'ops-planner',
        kind: 'decision',
        text: decisions.slice(0, 220),
      });
    }
    if (blockers) {
      events.push({
        ts: `${date}T09:30:00+05:30`,
        agent: 'ops-planner',
        kind: 'alert',
        text: `Blocker: ${blockers.slice(0, 200)}`,
      });
    }
  }
  return events.slice(0, 8);
}
