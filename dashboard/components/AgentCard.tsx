import Link from 'next/link';
import {
  Search,
  Store,
  Camera,
  Megaphone,
  LineChart,
  MessageCircle,
  Package,
  CalendarDays,
  Languages,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';
import { Pill, type PillTone } from './Pill';
import { StatusDot } from './StatusDot';
import { agentMeta, type AgentRuntime } from '@/data/mock';
import type { AgentDoc } from '@/lib/harness';
import { cn } from '@/lib/cn';

const icons: Record<string, LucideIcon> = {
  Search,
  Store,
  Camera,
  Megaphone,
  LineChart,
  MessageCircle,
  Package,
  CalendarDays,
  Languages,
};

export function AgentCard({
  doc,
  runtime,
}: {
  doc: AgentDoc;
  runtime?: AgentRuntime;
}) {
  const meta = agentMeta[doc.slug] ?? { icon: 'Megaphone', accent: 'saffron', tagline: '' };
  const Icon = icons[meta.icon] ?? Megaphone;
  const tone = (meta.accent as PillTone) ?? 'saffron';

  return (
    <Link
      href={`/agents/${doc.slug}`}
      className={cn(
        'group relative block overflow-hidden rounded-2xl border border-bg-border bg-bg-card p-5 shadow-soft transition',
        'hover:border-saffron-500/40 hover:shadow-glow',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-xl border',
              tone === 'saffron' && 'border-saffron-500/30 bg-saffron-500/10 text-saffron-300',
              tone === 'teal' && 'border-teal-500/30 bg-teal-500/10 text-teal-300',
              tone === 'cream' && 'border-cream-300/30 bg-cream-300/10 text-cream-200',
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-ink">{doc.name}</div>
            <div className="text-xs text-ink-muted">{meta.tagline}</div>
          </div>
        </div>
        <ArrowUpRight className="h-4 w-4 text-ink-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-saffron-300" />
      </div>

      <p className="mt-4 line-clamp-2 text-sm text-ink-dim">{doc.description}</p>

      {runtime ? (
        <div className="mt-4 flex items-end justify-between border-t border-bg-border pt-4">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-ink-muted">
              {runtime.primaryMetric.label}
            </div>
            <div className="mt-0.5 text-xl font-semibold text-ink">
              {runtime.primaryMetric.value}
            </div>
            {runtime.primaryMetric.sub ? (
              <div className="text-xs text-ink-muted">{runtime.primaryMetric.sub}</div>
            ) : null}
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusDot status={runtime.status} withLabel />
            <Pill tone={tone} size="sm">
              {runtime.decisionsToday} decision{runtime.decisionsToday === 1 ? '' : 's'} today
            </Pill>
          </div>
        </div>
      ) : null}
    </Link>
  );
}
