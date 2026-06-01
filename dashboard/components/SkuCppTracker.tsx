import type { SkuEcon } from '@/data/mock';
import { cn } from '@/lib/cn';
import { TrendingUp, Pause, AlertTriangle, Clock } from 'lucide-react';

function classify(econ: SkuEcon): {
  label: string;
  desc: string;
  tone: 'ok' | 'saffron' | 'warn' | 'bad' | 'dim';
  icon: typeof TrendingUp;
} {
  const { sp, actualCpp, campaignStatus } = econ;
  if (campaignStatus === 'draft') return { label: 'Draft', desc: 'Not launched yet', tone: 'dim', icon: Clock };
  if (campaignStatus === 'paused') return { label: 'Paused', desc: 'Campaign paused', tone: 'dim', icon: Pause };
  if (actualCpp === null) return { label: 'No data', desc: 'CPP unavailable', tone: 'dim', icon: Clock };

  const target = Math.round(sp * 0.08);
  const kill = target + 10;

  if (actualCpp <= target)  return { label: 'Scale',  desc: `CPP ₹${actualCpp} ≤ target ₹${target}`, tone: 'ok',     icon: TrendingUp };
  if (actualCpp <= kill)    return { label: 'Hold',   desc: `CPP ₹${actualCpp} within ₹10 buffer`,   tone: 'saffron', icon: Clock };
  if (actualCpp <= kill*1.3) return { label: 'Warning',desc: `CPP ₹${actualCpp} > kill ₹${kill}`,   tone: 'warn',    icon: AlertTriangle };
  return                          { label: 'Kill',   desc: `CPP ₹${actualCpp} well over ₹${kill}`,   tone: 'bad',     icon: AlertTriangle };
}

const toneColors = {
  ok:      { bar: 'bg-ok',          text: 'text-ok',          pill: 'bg-ok/15 text-ok border-ok/25' },
  saffron: { bar: 'bg-saffron-400', text: 'text-saffron-300', pill: 'bg-saffron-500/15 text-saffron-300 border-saffron-400/25' },
  warn:    { bar: 'bg-warn',        text: 'text-warn',         pill: 'bg-warn/15 text-warn border-warn/25' },
  bad:     { bar: 'bg-bad',         text: 'text-bad',          pill: 'bg-bad/15 text-bad border-bad/25' },
  dim:     { bar: 'bg-bg-border',   text: 'text-ink-muted',    pill: 'bg-bg-border text-ink-muted border-bg-border' },
};

export function SkuCppTracker({ skus }: { skus: SkuEcon[] }) {
  return (
    <div className="space-y-3">
      {skus.map((sku) => {
        const target = Math.round(sku.sp * 0.08);
        const kill = target + 10;
        const pct = sku.actualCpp === null
          ? 0
          : Math.min((sku.actualCpp / kill) * 100, 100);

        const cls = classify(sku);
        const tc = toneColors[cls.tone];
        const Icon = cls.icon;

        return (
          <div key={sku.sku} className="group rounded-xl border border-bg-border bg-bg-elev px-4 py-3 transition hover:border-bg-border/80">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{sku.name}</p>
                <p className="text-xs text-ink-muted">
                  {sku.sku} · SP ₹{sku.sp} · Target CPP ₹{target} · Kill ₹{kill}
                </p>
              </div>
              <div className={cn('flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium', tc.pill)}>
                <Icon className="h-3 w-3" />
                {cls.label}
              </div>
            </div>

            {/* CPP progress bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px] text-ink-muted mb-1">
                <span>Actual CPP {sku.actualCpp !== null ? `₹${sku.actualCpp}` : '—'}</span>
                <span>Kill ₹{kill}</span>
              </div>
              <div className="relative h-1.5 rounded-full bg-bg-border overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all duration-500', tc.bar)}
                  style={{ width: `${pct}%` }}
                />
                {/* Target marker */}
                <div
                  className="absolute top-0 h-full w-px bg-ink-dim/60"
                  style={{ left: `${(target / kill) * 100}%` }}
                  title={`Target ₹${target}`}
                />
              </div>
            </div>

            <p className="mt-1 text-[11px] text-ink-muted">{cls.desc}</p>
          </div>
        );
      })}
    </div>
  );
}
