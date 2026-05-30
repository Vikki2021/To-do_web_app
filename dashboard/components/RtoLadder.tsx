import type { RtoLadder as RtoLadderT } from '@/data/mock';
import { Pill } from './Pill';
import { cn } from '@/lib/cn';

export function RtoLadder({ data }: { data: RtoLadderT }) {
  const onTarget = data.rtoRate7d <= data.target;

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between">
        <div>
          <div className="font-mono text-2xl tracking-tight">
            <span className={cn(onTarget ? 'text-ok' : 'text-warn')}>
              {data.rtoRate7d.toFixed(1)}%
            </span>
          </div>
          <div className="text-[11px] text-ink-muted">7-day RTO · target ≤ {data.target}%</div>
        </div>
        <Pill tone={onTarget ? 'ok' : 'warn'}>
          {onTarget ? 'On target' : `${(data.rtoRate7d - data.target).toFixed(1)} pp above target`}
        </Pill>
      </div>

      <div className="space-y-1.5">
        {data.tiers.map((t) => {
          const total = t.count + t.cancelledNoReply;
          const pendingPct = total > 0 ? (t.count / total) * 100 : 0;
          return (
            <div key={t.key} className="rounded-xl border border-bg-border bg-white/[0.02] p-2.5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-medium text-ink-dim">{t.label}</div>
                  <div className="text-[10px] text-ink-muted">{t.threshold}</div>
                </div>
                <div className="text-right font-mono text-xs">
                  <span className="text-ink">{t.count}</span>
                  <span className="text-ink-muted"> pending</span>
                  {t.cancelledNoReply > 0 && (
                    <span className="ml-2 text-bad">· {t.cancelledNoReply} auto-cancel</span>
                  )}
                </div>
              </div>
              {total > 0 && (
                <div className="mt-1.5 flex h-1 overflow-hidden rounded-full bg-white/5">
                  <div className="h-full bg-saffron-400" style={{ width: `${pendingPct}%` }} />
                  <div className="h-full bg-bad/60" style={{ width: `${100 - pendingPct}%` }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
