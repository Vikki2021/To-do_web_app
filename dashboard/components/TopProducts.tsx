import { Pill } from './Pill';
import type { TopProduct } from '@/data/mock';
import { formatINR } from '@/lib/cn';

export function TopProducts({ data }: { data: TopProduct[] }) {
  if (!data.length) {
    return <p className="py-6 text-center text-sm text-ink-muted">No product sales yet.</p>;
  }
  return (
    <div className="overflow-x-auto scroll-thin">
      <table className="w-full min-w-[560px] border-separate border-spacing-y-1 text-left text-sm">
        <thead>
          <tr className="text-[10px] uppercase tracking-wider text-ink-muted">
            <th className="px-3 py-2 font-medium">SKU</th>
            <th className="px-3 py-2 font-medium">Product</th>
            <th className="px-3 py-2 text-right font-medium">Sold</th>
            <th className="px-3 py-2 text-right font-medium">Revenue</th>
            <th className="px-3 py-2 text-right font-medium">Margin</th>
            <th className="px-3 py-2 text-right font-medium">RTO</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => {
            const rtoTone = p.rtoPct < 20 ? 'ok' : p.rtoPct < 25 ? 'warn' : 'bad';
            return (
              <tr key={p.sku} className="rounded-xl bg-bg-elev/60 transition hover:bg-bg-elev">
                <td className="rounded-l-xl px-3 py-3 font-mono text-xs text-ink-dim">{p.sku}</td>
                <td className="px-3 py-3 text-ink">{p.name}</td>
                <td className="px-3 py-3 text-right text-ink-dim">{p.sold}</td>
                <td className="px-3 py-3 text-right text-ink">{formatINR(p.revenue)}</td>
                <td className="px-3 py-3 text-right text-ink-dim">{p.marginPct}%</td>
                <td className="rounded-r-xl px-3 py-3 text-right">
                  <Pill tone={rtoTone} size="sm">
                    {p.rtoPct.toFixed(0)}%
                  </Pill>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
