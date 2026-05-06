import {
  AlertTriangle,
  ArrowRightLeft,
  CheckCircle2,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { activity } from '@/data/mock';

const kindIcon: Record<string, LucideIcon> = {
  decision: CheckCircle2,
  alert: AlertTriangle,
  run: Sparkles,
  handoff: ArrowRightLeft,
};

const kindColor: Record<string, string> = {
  decision: 'text-ok',
  alert: 'text-warn',
  run: 'text-saffron-300',
  handoff: 'text-teal-300',
};

function relTime(iso: string, now = new Date('2026-05-05T09:35:00+05:30')): string {
  const t = new Date(iso).getTime();
  const diff = Math.max(0, now.getTime() - t);
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export function ActivityFeed() {
  return (
    <ol className="space-y-3">
      {activity.map((e, i) => {
        const Icon = kindIcon[e.kind] ?? Sparkles;
        return (
          <li
            key={i}
            className="group flex items-start gap-3 rounded-xl border border-bg-border bg-bg-elev px-4 py-3 transition hover:border-saffron-500/30"
          >
            <Icon className={cn('mt-0.5 h-4 w-4 shrink-0', kindColor[e.kind])} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-ink">{e.agent}</span>
                <span className="text-[10px] uppercase tracking-wider text-ink-muted">
                  {e.kind}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-ink-dim">{e.text}</p>
            </div>
            <span className="shrink-0 text-[11px] text-ink-muted">{relTime(e.ts)}</span>
          </li>
        );
      })}
    </ol>
  );
}
