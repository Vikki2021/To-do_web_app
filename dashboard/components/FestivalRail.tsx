import { CalendarHeart } from 'lucide-react';
import { upcomingFestivals } from '@/data/mock';

function daysUntil(target: string, today = new Date('2026-05-05T00:00:00+05:30')) {
  const t = new Date(target).getTime();
  const diff = Math.ceil((t - today.getTime()) / (24 * 3600 * 1000));
  return Math.max(0, diff);
}

export function FestivalRail() {
  return (
    <div className="space-y-2">
      {upcomingFestivals.map((f) => {
        const d = daysUntil(f.date);
        return (
          <div
            key={f.name}
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
