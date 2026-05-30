import type { SeasonalAlert } from '@/data/mock';
import { AlertTriangle, Snowflake, Cloud, Sparkles, Wind } from 'lucide-react';
import { cn } from '@/lib/cn';

const windowIcon = {
  cooling:  Wind,
  monsoon:  Cloud,
  festival: Sparkles,
  winter:   Snowflake,
};

function tone(days: number, campaignLive: boolean) {
  if (days <= 7  && !campaignLive) return { ring: 'border-bad/40 bg-bad/5',   text: 'text-bad',   label: 'URGENT' };
  if (days <= 14 && !campaignLive) return { ring: 'border-warn/40 bg-warn/5', text: 'text-warn',  label: 'Closing soon' };
  if (days <= 21)                  return { ring: 'border-saffron-500/30 bg-saffron-500/5', text: 'text-saffron-300', label: 'On horizon' };
  return null;
}

export function SeasonalUrgency({ alerts }: { alerts: SeasonalAlert[] }) {
  const filtered = alerts
    .map((a) => ({ ...a, t: tone(a.daysRemaining, a.campaignLive) }))
    .filter((a) => a.t !== null);

  if (filtered.length === 0) return null;

  return (
    <section
      className={cn(
        'rounded-2xl border p-4',
        filtered.some((f) => f.t?.label === 'URGENT')        ? 'border-bad/40  bg-bad/5'  :
        filtered.some((f) => f.t?.label === 'Closing soon')  ? 'border-warn/40 bg-warn/5' :
                                                               'border-saffron-500/30 bg-saffron-500/5'
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-warn" />
        <h2 className="text-sm font-medium uppercase tracking-wider text-ink-dim">
          Seasonal urgency
        </h2>
        <span className="ml-auto text-[10.5px] text-ink-muted">
          {filtered.length} {filtered.length === 1 ? 'window' : 'windows'} flagged
        </span>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => {
          const Icon = windowIcon[a.window];
          return (
            <div
              key={a.product}
              className={cn('flex items-center gap-3 rounded-xl border bg-bg-card/80 p-3', a.t?.ring)}
            >
              <Icon className={cn('h-5 w-5', a.t?.text)} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{a.product}</div>
                <div className="text-[11px] text-ink-muted">
                  {a.window} window · campaign {a.campaignLive ? 'live' : 'NOT live'}
                </div>
              </div>
              <div className="text-right">
                <div className={cn('font-mono text-base font-semibold', a.t?.text)}>
                  {a.daysRemaining}d
                </div>
                <div className={cn('text-[9.5px] uppercase tracking-wider', a.t?.text)}>{a.t?.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
