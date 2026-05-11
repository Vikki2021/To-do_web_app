import {
  IndianRupee,
  Wallet,
  TrendingUp,
  PackageX,
  ShoppingBag,
  UsersRound,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardBody, CardHeader } from '@/components/Card';
import { KpiCard } from '@/components/KpiCard';
import { AgentCard } from '@/components/AgentCard';
import { PlaybookCard } from '@/components/PlaybookCard';
import { ActivityFeed } from '@/components/ActivityFeed';
import { RevenueChart } from '@/components/RevenueChart';
import { TopProducts } from '@/components/TopProducts';
import { TopAds } from '@/components/TopAds';
import { FestivalRail } from '@/components/FestivalRail';
import { Pill } from '@/components/Pill';
import { SourceErrorBanner } from '@/components/SourceErrorBanner';
import { agents as runtime, playbooks } from '@/data/mock';
import { getAllAgents } from '@/lib/harness';
import { getDashboardData } from '@/lib/data';
import { formatINR, formatPct } from '@/lib/cn';

export const revalidate = 60;

const playbookPrompts: Record<string, string> = {
  'daily-ops': 'Run daily ops per .claude/playbooks/daily-ops.md.',
  'weekly-review': 'Run the weekly review per .claude/playbooks/weekly-review.md.',
  'launch-product':
    'Launch a new product end-to-end per .claude/playbooks/launch-product.md. Ask me which SKU.',
  'festival-sale':
    'Plan and execute the next festival sale per .claude/playbooks/festival-sale.md.',
  'scale-winner':
    'Scale our top winner per .claude/playbooks/scale-winner.md after marketing-analytics reconciliation.',
  'kill-loser':
    'Run kill-loser per .claude/playbooks/kill-loser.md on the worst current ad set / product.',
};

export default async function HomePage() {
  const [data, agents] = await Promise.all([getDashboardData(), Promise.resolve(getAllAgents())]);
  const { kpis, revenue7d, topProducts, topAds, festivals, activity, liveSources, sourceErrors } = data;
  const now = new Date();
  const dateLine = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(now);
  const revDelta = kpis.revenue7dAvg > 0
    ? ((kpis.revenueYesterday - kpis.revenue7dAvg) / kpis.revenue7dAvg) * 100
    : 0;
  const allLive = liveSources.shopify && liveSources.meta && liveSources.notion;
  const allMock = !liveSources.shopify && !liveSources.meta && !liveSources.notion;
  const modeLabel = allLive ? 'Live · Production' : allMock ? 'Demo data' : 'Hybrid · partial live';

  return (
    <div className="space-y-10">
      <SourceErrorBanner errors={sourceErrors} />

      {/* Hero */}
      <section className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-2">
            <Pill tone={allLive ? 'ok' : allMock ? 'warn' : 'saffron'} size="sm">{modeLabel}</Pill>
            <span className="text-xs text-ink-muted">{dateLine}</span>
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Namaste, operator. <span className="gradient-text">Aaj ka plan ready hai.</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-ink-dim">
            9 agents · 4 skills · 6 playbooks. Every threshold lives in versioned skills, not in agent prompts.
            Run the <code className="font-mono text-saffron-300">daily-ops</code> playbook to clear today, or jump
            into a pillar below.
          </p>
        </div>

        <div className="flex flex-col items-stretch gap-2 sm:flex-row">
          <Link
            href="/playbooks/daily-ops"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-400 px-5 py-2.5 text-sm font-semibold text-bg shadow-glow transition hover:from-saffron-400 hover:to-saffron-300"
          >
            Run Daily Ops <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/agents"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-bg-border bg-bg-elev px-5 py-2.5 text-sm font-medium text-ink-dim transition hover:border-teal-400/30 hover:text-teal-200"
          >
            Browse agents
          </Link>
        </div>
      </section>

      {/* KPI strip */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-6">
        <KpiCard
          label="Revenue today"
          value={formatINR(kpis.revenueToday)}
          delta={liveSources.shopify ? 'live' : 'mock'}
          deltaTone="neutral"
          hint="so far · today"
          icon={<IndianRupee className="h-4 w-4" />}
        />
        <KpiCard
          label="Yesterday final"
          value={formatINR(kpis.revenueYesterday)}
          delta={kpis.revenue7dAvg > 0 ? formatPct(revDelta) : '—'}
          deltaTone={revDelta >= 0 ? 'up' : 'down'}
          hint={`7d avg ${formatINR(kpis.revenue7dAvg)}`}
          icon={<IndianRupee className="h-4 w-4" />}
        />
        <KpiCard
          label="7d ad spend"
          value={formatINR(kpis.spend7d)}
          hint={liveSources.meta ? 'Meta · live' : 'Meta · mock'}
          icon={<Wallet className="h-4 w-4" />}
        />
        <KpiCard
          label="Blended ROAS"
          value={`${kpis.blendedRoas.toFixed(2)}x`}
          delta={`BE ${kpis.breakEvenRoas.toFixed(1)}x`}
          deltaTone={kpis.blendedRoas >= kpis.breakEvenRoas * 1.4 ? 'up' : 'neutral'}
          hint={`Meta in-platform ${kpis.metaRoasInPlatform.toFixed(2)}x`}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <KpiCard
          label="RTO trailing 14d"
          value={`${kpis.rtoPctTrailing14d.toFixed(1)}%`}
          delta={kpis.rtoPctTrailing14d <= 25 ? 'within target' : 'above target'}
          deltaTone={kpis.rtoPctTrailing14d <= 25 ? 'up' : 'down'}
          hint="COD orders · target ≤25%"
          icon={<PackageX className="h-4 w-4" />}
        />
        <KpiCard
          label="Today orders / AOV"
          value={`${kpis.ordersToday} · ${formatINR(kpis.aov)}`}
          hint={`${kpis.newCustomersToday} new · ${kpis.cvr.toFixed(2)}% CVR`}
          icon={<ShoppingBag className="h-4 w-4" />}
        />
      </section>

      {/* Revenue chart + Festival rail */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="7-day revenue & spend"
            subtitle="Solid: revenue · Dashed: spend"
            right={
              <div className="flex items-center gap-3 text-xs text-ink-dim">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-3 rounded-full bg-gradient-to-r from-saffron-400 to-teal-400" />
                  Revenue
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-0.5 w-3 bg-ink-dim" />
                  Spend
                </span>
              </div>
            }
          />
          <CardBody>
            <RevenueChart data={revenue7d} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Festival horizon"
            subtitle="Plan T-7 to T-21 windows · per india-localizer"
            right={<UsersRound className="h-4 w-4 text-ink-muted" />}
          />
          <CardBody>
            <FestivalRail data={festivals} />
          </CardBody>
        </Card>
      </section>

      {/* Agents grid */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Pillars</h2>
            <p className="text-xs text-ink-muted">Each agent owns one pillar. Click for the full spec.</p>
          </div>
          <Link href="/agents" className="text-xs text-teal-300 hover:underline">
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {agents.map((doc) => {
            const r = runtime.find((x) => x.slug === doc.slug);
            return <AgentCard key={doc.slug} doc={doc} runtime={r} />;
          })}
        </div>
      </section>

      {/* Playbooks */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Playbooks</h2>
            <p className="text-xs text-ink-muted">
              One-click run prompts. Copy and paste into Claude Code.
            </p>
          </div>
          <Link href="/playbooks" className="text-xs text-teal-300 hover:underline">
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {playbooks.map((p, i) => (
            <PlaybookCard
              key={p.slug}
              slug={p.slug}
              title={p.title}
              desc={p.desc}
              accent={p.accent as 'saffron' | 'teal' | 'cream'}
              icon={p.icon}
              prompt={playbookPrompts[p.slug] ?? `Run ${p.title} per .claude/playbooks/${p.slug}.md.`}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* Tables + activity */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader
            title="Top products · last 7d"
            subtitle={liveSources.shopify ? 'Live from Shopify · margin from launch briefs' : 'Demo data'}
          />
          <CardBody>
            <TopProducts data={topProducts} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Activity feed"
            subtitle={liveSources.notion ? 'Live from Notion Daily Standup' : 'Demo data'}
          />
          <CardBody>
            <ActivityFeed data={activity} />
          </CardBody>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader
            title="Top ad sets · last 7d"
            subtitle={liveSources.meta ? 'Live from Meta Marketing API' : 'Demo data — wire META_ACCESS_TOKEN to go live'}
          />
          <CardBody>
            <TopAds data={topAds} />
          </CardBody>
        </Card>
      </section>
    </div>
  );
}
