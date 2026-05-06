import { revenue7d } from '@/data/mock';
import { formatINR } from '@/lib/cn';

export function RevenueChart() {
  const w = 720;
  const h = 220;
  const pad = { l: 40, r: 16, t: 16, b: 28 };
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;

  const revs = revenue7d.map((d) => d.revenue);
  const spends = revenue7d.map((d) => d.spend);
  const all = [...revs, ...spends];
  const min = Math.min(...all) * 0.85;
  const max = Math.max(...all) * 1.05;
  const range = max - min || 1;

  const x = (i: number) => pad.l + (i * innerW) / Math.max(1, revenue7d.length - 1);
  const y = (v: number) => pad.t + (1 - (v - min) / range) * innerH;

  const buildPath = (vals: number[]) =>
    vals.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');

  const revPath = buildPath(revs);
  const spendPath = buildPath(spends);
  const revArea = `${revPath} L ${x(revs.length - 1)} ${pad.t + innerH} L ${pad.l} ${pad.t + innerH} Z`;

  const yTicks = 4;
  const tickValues = Array.from({ length: yTicks + 1 }, (_, i) => min + (range * i) / yTicks);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="block w-full">
      <defs>
        <linearGradient id="revGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="#ff8533" />
          <stop offset="100%" stopColor="#2ed9c1" />
        </linearGradient>
        <linearGradient id="revFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ff8533" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#2ed9c1" stopOpacity="0" />
        </linearGradient>
      </defs>

      {tickValues.map((tv, i) => (
        <g key={i}>
          <line
            x1={pad.l}
            x2={pad.l + innerW}
            y1={y(tv)}
            y2={y(tv)}
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="3 4"
          />
          <text
            x={pad.l - 8}
            y={y(tv)}
            textAnchor="end"
            dominantBaseline="middle"
            className="fill-ink-muted"
            fontSize="10"
          >
            {formatINR(tv)}
          </text>
        </g>
      ))}

      <path d={revArea} fill="url(#revFill)" />
      <path d={spendPath} fill="none" stroke="#a1a1aa" strokeWidth={1.5} strokeDasharray="4 4" />
      <path d={revPath} fill="none" stroke="url(#revGrad)" strokeWidth={2.4} strokeLinecap="round" />

      {revenue7d.map((d, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(d.revenue)} r={i === revenue7d.length - 1 ? 4 : 2.5} fill="#ff8533" />
          <text
            x={x(i)}
            y={pad.t + innerH + 18}
            textAnchor="middle"
            className="fill-ink-muted"
            fontSize="10"
          >
            {d.day}
          </text>
        </g>
      ))}
    </svg>
  );
}
