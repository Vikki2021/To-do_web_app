import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/Card';
import { Pill } from '@/components/Pill';
import { StatusDot } from '@/components/StatusDot';
import { Markdown } from '@/components/Markdown';
import { CopyButton } from '@/components/CopyButton';
import { getAgent, getAllAgents } from '@/lib/harness';
import { agents as runtime, agentMeta } from '@/data/mock';

export function generateStaticParams() {
  return getAllAgents().map((a) => ({ name: a.slug }));
}

export default async function AgentDetail({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const doc = getAgent(name);
  if (!doc) return notFound();
  const r = runtime.find((x) => x.slug === doc.slug);
  const meta = agentMeta[doc.slug] ?? { icon: 'Megaphone', accent: 'saffron', tagline: '' };
  const runPrompt = `Invoke the ${doc.name} agent now. Brief it on whatever the highest-priority pillar task is per its agent file at .claude/agents/${doc.slug}.md.`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs text-ink-muted">
        <Link href="/" className="hover:text-ink">Dashboard</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/agents" className="hover:text-ink">Agents</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-ink">{doc.name}</span>
      </div>

      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Link href="/agents" className="inline-flex items-center gap-1 text-xs text-ink-dim hover:text-ink">
            <ArrowLeft className="h-3 w-3" /> All agents
          </Link>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{doc.name}</h1>
          <p className="mt-1 text-sm text-ink-dim">{meta.tagline}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {r ? <StatusDot status={r.status} withLabel /> : null}
            {doc.model ? <Pill tone="teal" size="sm">model: {doc.model}</Pill> : null}
            <Pill tone={(meta.accent as 'saffron' | 'teal' | 'cream') ?? 'saffron'} size="sm">
              {doc.slug}
            </Pill>
          </div>
        </div>
        <CopyButton text={runPrompt} label="Copy invoke prompt" />
      </div>

      {r ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <KpiMini label={r.primaryMetric.label} value={r.primaryMetric.value} sub={r.primaryMetric.sub} />
          <KpiMini label="Decisions today" value={String(r.decisionsToday)} />
          <KpiMini label="Last run" value={new Date(r.lastRunIso).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit' })} />
          <KpiMini label="Status" value={r.status} />
        </div>
      ) : null}

      <Card>
        <CardHeader title="Description" />
        <CardBody>
          <p className="text-sm text-ink-dim">{doc.description}</p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Agent spec" subtitle={`Source: .claude/agents/${doc.slug}.md`} />
        <CardBody>
          <Markdown source={doc.body} />
        </CardBody>
      </Card>
    </div>
  );
}

function KpiMini({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-bg-border bg-bg-card p-4 shadow-soft">
      <div className="text-[10px] uppercase tracking-wider text-ink-muted">{label}</div>
      <div className="mt-1 text-xl font-semibold text-ink">{value}</div>
      {sub ? <div className="text-xs text-ink-muted">{sub}</div> : null}
    </div>
  );
}
