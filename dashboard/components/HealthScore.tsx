import type { HealthScore as HealthScoreT } from '@/data/mock';
import { cn } from '@/lib/cn';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

function dimensionTone(score: number) {
  if (score >= 16) return { fg: 'bg-ok', text: 'text-ok', label: 'Strong' };
  if (score >= 11) return { fg: 'bg-saffron-400', text: 'text-saffron-300', label: 'Healthy' };
  if (score >= 6)  return { fg: 'bg-warn', text: 'text-warn', label: 'Soft' };
  return { fg: 'bg-bad', text: 'text-bad', label: 'Critical' };
}

function overallTone(total: number) {
  if (total >= 80) return { ring: 'stroke-ok', label: 'Excellent', tag: 'text-ok' };
  if (total >= 60) return { ring: 'stroke-saffron-400', label: 'Healthy', tag: 'text-saffron-300' };
  if (total >= 40) return { ring: 'stroke-warn', label: 'Soft', tag: 'text-warn' };
  return { ring: 'stroke-bad', label: 'Critical', tag: 'text-bad' };
}

export function HealthScore({ data }: { data: HealthScoreT }) {
  const tone = overallTone(data.total);
  const circumference = 2 * Math.PI * 56;
  const dashOffset = circumference * (1 - data.total / 100);

  const TrendIcon = data.trend === 'up' ? TrendingUp : data.trend === 'down' ? TrendingDown : Minus;
  const trendClass =
    data.trend === 'up' ? 'text-ok' : data.trend === 'down' ? 'text-bad' : 'text-ink-muted';

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[160px_1fr] md:items-center">
      {/* Donut */}
      <div className="relative mx-auto h-40 w-40 md:mx-0">
        <svg viewBox="0 0 140 140" className="-rotate-90">
          <circle cx="70" cy="70" r="56" strokeWidth="14" fill="none" className="stroke-white/5" />
          <circle
            cx="70"
            cy="70"
            r="56"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className={cn('transition-all duration-700', tone.ring)}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn('text-3xl font-semibold tracking-tight', tone.tag)}>{data.total}</span>
          <span className="text-[10px] uppercase tracking-wider text-ink-muted">/ 100</span>
          <span className={cn('mt-1 inline-flex items-center gap-1 text-[11px]', trendClass)}>
            <TrendIcon className="h-3 w-3" />
            {data.deltaWoW > 0 ? '+' : ''}
            {data.deltaWoW} WoW
          </span>
        </div>
      </div>

      {/* Dimension bars */}
      <div className="space-y-2.5">
        {data.dimensions.map((d) => {
          const t = dimensionTone(d.score);
          const pct = (d.score / 20) * 100;
          return (
            <div key={d.key} className="group">
              <div className="flex items-baseline justify-between text-xs">
                <span className="font-medium text-ink-dim">{d.label}</span>
                <span className={cn('font-mono', t.text)}>
                  {d.score}<span className="text-ink-muted">/20</span>
                </span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/5">
                <div
                  className={cn('h-full rounded-full transition-all duration-500', t.fg)}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-1 text-[10.5px] text-ink-muted opacity-70 group-hover:opacity-100 transition">
                {d.notes}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
