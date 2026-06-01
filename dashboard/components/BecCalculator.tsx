'use client';
import { useState, useMemo } from 'react';
import { Calculator, TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';
import { cn, formatINR } from '@/lib/cn';

const FAD = 0.70;
const RTO_COST = 72;

function compute(sp: number, lc: number) {
  const targetCpp = Math.round(sp * 0.08);
  const killCpp = targetCpp + 10;
  const grossMarginPct = sp > 0 ? ((sp - lc) / sp) * 100 : 0;
  // NET per total order at target CPP
  const netPerOrder = FAD * (sp - lc) - targetCpp - (1 - FAD) * RTO_COST;
  const beRoas = sp > 0 && targetCpp > 0 ? sp / targetCpp : 0;
  const trueBeRoas = sp > 0 ? sp / (lc / FAD + targetCpp / FAD + RTO_COST * (1 - FAD) / FAD) : 0;
  return { targetCpp, killCpp, grossMarginPct, netPerOrder, beRoas, trueBeRoas };
}

type Verdict = 'go' | 'hold' | 'kill';
function getVerdict(net: number, grossMarginPct: number): Verdict {
  if (net > 0 && grossMarginPct >= 60) return 'go';
  if (net > 0) return 'hold';
  return 'kill';
}

const verdictMeta: Record<Verdict, { label: string; color: string; bg: string }> = {
  go:   { label: 'GO',   color: 'text-ok',   bg: 'bg-ok/10 border-ok/30' },
  hold: { label: 'HOLD', color: 'text-warn',  bg: 'bg-warn/10 border-warn/30' },
  kill: { label: 'KILL', color: 'text-bad',   bg: 'bg-bad/10 border-bad/30' },
};

interface Props {
  defaultSp?: number;
  defaultLc?: number;
}

export function BecCalculator({ defaultSp = 1199, defaultLc = 300 }: Props) {
  const [sp, setSp] = useState(defaultSp);
  const [lc, setLc] = useState(defaultLc);
  const [actualCpp, setActualCpp] = useState<number | ''>('');

  const { targetCpp, killCpp, grossMarginPct, netPerOrder, beRoas } = useMemo(
    () => compute(sp, lc),
    [sp, lc],
  );

  const verdict = getVerdict(netPerOrder, grossMarginPct);
  const vm = verdictMeta[verdict];

  const cppStatus =
    actualCpp === ''
      ? null
      : actualCpp <= targetCpp
      ? 'scale'
      : actualCpp <= killCpp
      ? 'hold'
      : 'kill';

  return (
    <div className="space-y-5">
      {/* Inputs */}
      <div className="grid grid-cols-3 gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs text-ink-muted">Selling price (₹)</span>
          <input
            type="number"
            min={0}
            value={sp}
            onChange={(e) => setSp(Number(e.target.value))}
            className="rounded-xl border border-bg-border bg-bg-elev px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-saffron-500/60 focus:ring-1 focus:ring-saffron-500/30"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs text-ink-muted">Landed cost (₹)</span>
          <input
            type="number"
            min={0}
            value={lc}
            onChange={(e) => setLc(Number(e.target.value))}
            className="rounded-xl border border-bg-border bg-bg-elev px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-teal-400/60 focus:ring-1 focus:ring-teal-400/30"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs text-ink-muted">Actual CPP (₹) — optional</span>
          <input
            type="number"
            min={0}
            value={actualCpp}
            placeholder="—"
            onChange={(e) => setActualCpp(e.target.value === '' ? '' : Number(e.target.value))}
            className="rounded-xl border border-bg-border bg-bg-elev px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-teal-400/60 focus:ring-1 focus:ring-teal-400/30"
          />
        </label>
      </div>

      {/* Results strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MetricTile
          label="Target CPP"
          value={`₹${targetCpp}`}
          sub="8% of SP"
          tone="saffron"
        />
        <MetricTile
          label="Kill threshold"
          value={`₹${killCpp}`}
          sub={`Target + ₹10`}
          tone="warn"
        />
        <MetricTile
          label="Gross margin"
          value={`${grossMarginPct.toFixed(1)}%`}
          sub={`SP−LC ÷ SP`}
          tone={grossMarginPct >= 60 ? 'ok' : grossMarginPct >= 45 ? 'saffron' : 'bad'}
        />
        <MetricTile
          label="Break-even ROAS"
          value={`${beRoas.toFixed(1)}×`}
          sub={`SP ÷ Target CPP`}
          tone="teal"
        />
      </div>

      {/* Economics verdict */}
      <div className={cn('flex items-center justify-between rounded-2xl border p-4', vm.bg)}>
        <div>
          <p className="text-xs text-ink-muted">Net profit / total order @ FAD 0.70</p>
          <p className={cn('mt-1 text-2xl font-semibold tabular-nums', netPerOrder >= 0 ? 'text-ok' : 'text-bad')}>
            {netPerOrder >= 0 ? '+' : ''}{formatINR(Math.round(netPerOrder))}
          </p>
          <p className="mt-0.5 text-xs text-ink-dim">
            FAD×(SP−LC) − TargetCPP − RTO×₹{RTO_COST}
          </p>
        </div>
        <div className={cn('rounded-2xl border px-5 py-3 text-center', vm.bg)}>
          <p className="text-xs text-ink-muted">Economics</p>
          <p className={cn('mt-1 text-xl font-bold tracking-widest', vm.color)}>{vm.label}</p>
        </div>
      </div>

      {/* Actual CPP status */}
      {cppStatus !== null && (
        <div className={cn(
          'flex items-center gap-3 rounded-2xl border p-3',
          cppStatus === 'scale' ? 'border-ok/30 bg-ok/10' :
          cppStatus === 'hold'  ? 'border-warn/30 bg-warn/10' :
                                   'border-bad/30 bg-bad/10',
        )}>
          {cppStatus === 'scale' ? (
            <TrendingUp className="h-5 w-5 shrink-0 text-ok" />
          ) : cppStatus === 'hold' ? (
            <Minus className="h-5 w-5 shrink-0 text-warn" />
          ) : (
            <AlertTriangle className="h-5 w-5 shrink-0 text-bad" />
          )}
          <div>
            <p className={cn('text-sm font-semibold',
              cppStatus === 'scale' ? 'text-ok' : cppStatus === 'hold' ? 'text-warn' : 'text-bad',
            )}>
              {cppStatus === 'scale'
                ? `CPP ₹${actualCpp} ≤ ₹${targetCpp} — SCALE per ad-scaling-rules`
                : cppStatus === 'hold'
                ? `CPP ₹${actualCpp} within ₹10 buffer — HOLD one more day`
                : `CPP ₹${actualCpp} > ₹${killCpp} — KILL ad set now`}
            </p>
            <p className="text-xs text-ink-dim">
              {cppStatus === 'scale'
                ? '+20% budget at 12 AM IST. Duplicate if ROAS ≥ BE×1.5.'
                : cppStatus === 'hold'
                ? `Check CTR ≥1% and CPC <₹7.5 before holding. If front-end also weak → kill.`
                : `Pause the ad set. Check creative: Hook Rate <20% = re-concept. High CTR = LP problem.`}
            </p>
          </div>
        </div>
      )}

      {/* Quick reference table */}
      <details className="group">
        <summary className="cursor-pointer list-none text-xs text-ink-muted hover:text-ink-dim flex items-center gap-1">
          <Calculator className="h-3.5 w-3.5" />
          <span>CPP quick-reference table</span>
          <span className="ml-auto text-ink-muted group-open:rotate-180 transition-transform">▾</span>
        </summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-bg-border">
                <th className="pb-1.5 text-left text-ink-muted font-normal">SP</th>
                <th className="pb-1.5 text-right text-ink-muted font-normal">Target CPP</th>
                <th className="pb-1.5 text-right text-ink-muted font-normal">Kill (+ ₹10)</th>
                <th className="pb-1.5 text-right text-ink-muted font-normal">BE ROAS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border">
              {([699, 999, 1199, 1499, 1999, 2499] as const).map((price) => {
                const t = Math.round(price * 0.08);
                const hl = price === sp;
                return (
                  <tr key={price} className={cn(hl && 'bg-saffron-500/10')}>
                    <td className={cn('py-1.5 font-medium', hl ? 'text-saffron-300' : 'text-ink')}>₹{price}</td>
                    <td className={cn('py-1.5 text-right tabular-nums', hl ? 'text-saffron-300' : 'text-ink')}>₹{t}</td>
                    <td className={cn('py-1.5 text-right tabular-nums', hl ? 'text-warn' : 'text-ink-dim')}>₹{t + 10}</td>
                    <td className={cn('py-1.5 text-right tabular-nums', hl ? 'text-teal-300' : 'text-ink-dim')}>{(price / t).toFixed(1)}×</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}

function MetricTile({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  tone: 'saffron' | 'teal' | 'ok' | 'warn' | 'bad';
}) {
  const colors = {
    saffron: 'text-saffron-300',
    teal:    'text-teal-300',
    ok:      'text-ok',
    warn:    'text-warn',
    bad:     'text-bad',
  };
  return (
    <div className="rounded-xl border border-bg-border bg-bg-elev p-3">
      <p className="text-xs text-ink-muted">{label}</p>
      <p className={cn('mt-1.5 text-xl font-semibold tabular-nums', colors[tone])}>{value}</p>
      <p className="mt-0.5 text-[11px] text-ink-muted">{sub}</p>
    </div>
  );
}
