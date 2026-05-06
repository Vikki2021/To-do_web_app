import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

export function KpiCard({
  label,
  value,
  delta,
  deltaTone = 'neutral',
  hint,
  icon,
  className,
}: {
  label: string;
  value: ReactNode;
  delta?: string;
  deltaTone?: 'up' | 'down' | 'neutral';
  hint?: string;
  icon?: ReactNode;
  className?: string;
}) {
  const deltaColor =
    deltaTone === 'up' ? 'text-ok' : deltaTone === 'down' ? 'text-bad' : 'text-ink-dim';
  return (
    <div
      className={cn(
        'group relative rounded-2xl border border-bg-border bg-bg-card p-5 shadow-soft transition',
        'hover:border-saffron-500/40 hover:shadow-glow',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-ink-dim">{label}</span>
        <span className="text-ink-muted opacity-70">{icon}</span>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-semibold tracking-tight text-ink">{value}</span>
        {delta ? <span className={cn('text-xs font-medium', deltaColor)}>{delta}</span> : null}
      </div>
      {hint ? <p className="mt-1 text-xs text-ink-muted">{hint}</p> : null}
    </div>
  );
}
