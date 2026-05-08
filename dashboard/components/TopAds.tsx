import { Pill, type PillTone } from './Pill';
import type { TopAd } from '@/data/mock';
import { formatINR } from '@/lib/cn';

const statusTone: Record<string, PillTone> = {
  scaling: 'ok',
  testing: 'saffron',
  fatigued: 'warn',
  killed: 'bad',
};

export function TopAds({ data }: { data: TopAd[] }) {
  if (!data.length) {
    return <p className="py-6 text-center text-sm text-ink-muted">No active ad sets.</p>;
  }
  return (
    <div className="overflow-x-auto scroll-thin">
      <table className="w-full min-w-[640px] border-separate border-spacing-y-1 text-left text-sm">
        <thead>
          <tr className="text-[10px] uppercase tracking-wider text-ink-muted">
            <th className="px-3 py-2 font-medium">Ad set</th>
            <th className="px-3 py-2 text-right font-medium">Spend</th>
            <th className="px-3 py-2 text-right font-medium">ROAS</th>
            <th className="px-3 py-2 text-right font-medium">CTR</th>
            <th className="px-3 py-2 text-right font-medium">Freq</th>
            <th className="px-3 py-2 text-right font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a) => {
            const roasTone: PillTone = a.roas >= 2.5 ? 'ok' : a.roas >= 1.6 ? 'saffron' : 'bad';
            return (
              <tr key={a.name} className="rounded-xl bg-bg-elev/60 transition hover:bg-bg-elev">
                <td className="rounded-l-xl px-3 py-3 text-ink">
                  <div className="font-medium">{a.name}</div>
                  <div className="font-mono text-[11px] text-ink-muted">{a.product}</div>
                </td>
                <td className="px-3 py-3 text-right text-ink-dim">{formatINR(a.spend)}</td>
                <td className="px-3 py-3 text-right">
                  <Pill tone={roasTone} size="sm">{a.roas.toFixed(2)}x</Pill>
                </td>
                <td className="px-3 py-3 text-right text-ink-dim">{a.ctr.toFixed(1)}%</td>
                <td className="px-3 py-3 text-right text-ink-dim">{a.freq.toFixed(1)}</td>
                <td className="rounded-r-xl px-3 py-3 text-right">
                  <Pill tone={statusTone[a.status]} size="sm">{a.status}</Pill>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
