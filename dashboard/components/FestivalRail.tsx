import { CalendarHeart } from 'lucide-react';
import type { FestivalEvent } from '@/data/mock';

function daysUntil(target: string, today = new Date()) {
  const t = new Date(target).getTime();
  const start = new Date(today);
  start.setHours(0, 0, 0, 0);
  const diff = Math.ceil((t - start.getTime()) / (24 * 3600 * 1000));
  return Math.max(0, diff);
}

export function FestivalRail({ data }: { data: FestivalEvent[] }) {
  if (!data.length) {
    return <p className="py-4 text-sm text-ink-muted">No upcoming festivals on the horizon.</p>;
  }
  return (
    <div className="space-y-2">
      {data.slice(0, 6).map((f) => {
        const d = daysUntil(f.date);
        return (
          <div
            key={`${f.name}-${f.date}`}
            className="flex items-center gap-3 rounded-xl border border-bg-border bg-bg-elev px-3 py-2.5"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-saffron-500/30 bg-saffron-500/10 text-saffron-300">
              <CalendarHeart className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-ink truncate">{f.name}</span>
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-ink-muted">
                  {f.prep}
                </span>
              </div>
              <div className="text-xs text-ink-muted truncate">{f.pillarTypes}</div>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-sm font-semibold text-ink">{d}d</div>
              <div className="text-[10px] text-ink-muted">to go</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
