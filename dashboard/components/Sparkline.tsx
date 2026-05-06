type Point = { x: number; y: number };

export function Sparkline({
  data,
  width = 320,
  height = 80,
  stroke = 'url(#sparkGrad)',
  fill = 'url(#sparkFill)',
}: {
  data: number[];
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
}) {
  if (!data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 4;
  const w = width - pad * 2;
  const h = height - pad * 2;
  const points: Point[] = data.map((y, i) => ({
    x: pad + (i * w) / Math.max(1, data.length - 1),
    y: pad + (1 - (y - min) / range) * h,
  }));
  const path = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');
  const area = `${path} L ${points[points.length - 1].x.toFixed(1)} ${(height - pad).toFixed(1)} L ${pad.toFixed(1)} ${(height - pad).toFixed(1)} Z`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="block">
      <defs>
        <linearGradient id="sparkGrad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#ff8533" />
          <stop offset="100%" stopColor="#2ed9c1" />
        </linearGradient>
        <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ff8533" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#2ed9c1" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={fill} />
      <path d={path} fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={i === points.length - 1 ? 3 : 0} fill="#ff8533" />
      ))}
    </svg>
  );
}
