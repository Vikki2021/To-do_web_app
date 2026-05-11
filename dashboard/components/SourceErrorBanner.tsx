import { AlertTriangle } from 'lucide-react';

export function SourceErrorBanner({
  errors,
}: {
  errors: { shopify: string | null; meta: string | null; notion: string | null };
}) {
  const failing = (
    [
      ['Shopify', errors.shopify],
      ['Meta', errors.meta],
      ['Notion', errors.notion],
    ] as const
  ).filter((row): row is [typeof row[0], string] => row[1] !== null);

  if (failing.length === 0) return null;

  return (
    <div className="rounded-2xl border border-bad/30 bg-bad/5 p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-bad" />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="text-sm font-semibold text-ink">
            {failing.length} live source{failing.length > 1 ? 's' : ''} returning no data
          </div>
          <ul className="space-y-1.5">
            {failing.map(([name, message]) => (
              <li key={name} className="text-xs text-ink-dim">
                <span className="font-mono text-bad">{name}</span>{' '}
                <span>{message}</span>
              </li>
            ))}
          </ul>
          <div className="text-[11px] text-ink-muted">
            Sections below show mock fallback values until the source is fixed.
            Check Vercel runtime logs for exact error codes.
          </div>
        </div>
      </div>
    </div>
  );
}
