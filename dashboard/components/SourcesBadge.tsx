import { Activity } from 'lucide-react';
import { cn } from '@/lib/cn';

export function SourcesBadge({
  sources,
}: {
  sources: { shopify: boolean; meta: boolean; notion: boolean };
}) {
  const liveCount = [sources.shopify, sources.meta, sources.notion].filter(Boolean).length;
  const allLive = liveCount === 3;
  const allMock = liveCount === 0;
  const label = allMock ? 'Demo data' : allLive ? 'Live' : 'Hybrid';
  const dotClass = allMock ? 'bg-warn' : allLive ? 'bg-ok live-dot' : 'bg-saffron-400 live-dot';

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-bg-border bg-bg-elev px-2.5 py-1 text-[11px] text-ink-dim">
      <Activity className={cn('h-3 w-3', allMock ? 'text-warn' : allLive ? 'text-ok' : 'text-saffron-400')} />
      <span>{label}</span>
      <span className="hidden gap-1 sm:inline-flex">
        <SourceDot label="Shopify" on={sources.shopify} />
        <SourceDot label="Meta" on={sources.meta} />
        <SourceDot label="Notion" on={sources.notion} />
      </span>
    </div>
  );
}

function SourceDot({ label, on }: { label: string; on: boolean }) {
  return (
    <span
      title={`${label}: ${on ? 'live' : 'mock'}`}
      className={cn(
        'inline-flex h-1.5 w-1.5 rounded-full',
        on ? 'bg-ok' : 'bg-bg-border',
      )}
    />
  );
}
