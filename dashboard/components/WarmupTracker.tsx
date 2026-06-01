import type { Warmup } from '@/data/mock';
import { Pill } from './Pill';
import { cn } from '@/lib/cn';
import { formatINR } from '@/lib/cn';

const statusTone: Record<Warmup['status'], 'ok' | 'warn' | 'bad'> = {
  'ON TRACK': 'ok',
  DRIFT: 'warn',
  HALT: 'bad',
};

export function WarmupTracker({ data }: { data: Warmup }) {
  if (!data.active) {
    return (
      <p className="text-xs text-ink-muted">
        Ad account out of warmup. Full scaling permitted per <code className="font-mono">ad-scaling-rules</code>.
      </p>
    );
  }

  const days = Array.from({ length: data.maxDays }, (_, i) => i + 1);
  const spendPct = Math.min(100, (data.spendToday / data.spendCap) * 100);

  const checks = [
    { label: '≥5 purchase events',        ok: data.purchases >= data.purchaseTarget, val: `${data.purchases} / ${data.purchaseTarget}` },
    { label: 'EMQ ≥ 6.0',                 ok: data.emq >= data.emqTarget,            val: data.emq.toFixed(1) },
    { label: '0 policy strikes',          ok: data.strikes === 0,                    val: String(data.strikes) },
    { label: 'Spend within ₹1,000 cap',   ok: data.spendToday <= data.spendCap,      val: formatINR(data.spendToday) },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-2xl tracking-tight">
            Day <span className="text-saffron-300">{data.day}</span>
            <span className="text-ink-muted">/{data.maxDays}</span>
          </div>
          <div className="text-[11px] text-ink-muted">
            {data.maxDays - data.day} days until full-scale eligibility
          </div>
        </div>
        <Pill tone={statusTone[data.status]}>{data.status}</Pill>
      </div>

      {/* Day pip strip */}
      <div className="flex gap-1.5">
        {days.map((d) => (
          <div
            key={d}
            className={cn(
              'h-2 flex-1 rounded-full transition',
              d < data.day && 'bg-ok',
              d === data.day && 'bg-saffron-400 live-dot',
              d > data.day && 'bg-white/5',
            )}
          />
        ))}
      </div>

      {/* Spend gauge */}
      <div>
        <div className="mb-1 flex items-baseline justify-between text-xs">
          <span className="text-ink-dim">Today's spend</span>
          <span className="font-mono text-ink-dim">
            {formatINR(data.spendToday)} <span className="text-ink-muted">/ {formatINR(data.spendCap)}</span>
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              spendPct < 80 ? 'bg-teal-400' : spendPct < 100 ? 'bg-saffron-400' : 'bg-bad',
            )}
            style={{ width: `${spendPct}%` }}
          />
        </div>
      </div>

      {/* Graduation checklist */}
      <div className="space-y-1.5">
        {checks.map((c) => (
          <div key={c.label} className="flex items-center justify-between rounded-lg border border-bg-border bg-white/[0.02] px-2.5 py-1.5">
            <span className="flex items-center gap-2 text-xs">
              <span className={cn('h-1.5 w-1.5 rounded-full', c.ok ? 'bg-ok' : 'bg-warn')} />
              {c.label}
            </span>
            <span className={cn('font-mono text-[11px]', c.ok ? 'text-ok' : 'text-warn')}>
              {c.val}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
