import { cn } from '@/lib/cn';
import type { AgentStatus } from '@/data/mock';

const colors: Record<AgentStatus, string> = {
  idle: 'bg-ink-muted',
  ok: 'bg-ok',
  running: 'bg-saffron-400 live-dot',
  attention: 'bg-warn',
};

const labels: Record<AgentStatus, string> = {
  idle: 'Idle',
  ok: 'Healthy',
  running: 'Running',
  attention: 'Needs attention',
};

export function StatusDot({ status, withLabel = false }: { status: AgentStatus; withLabel?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs text-ink-dim">
      <span className={cn('h-2 w-2 rounded-full', colors[status])} />
      {withLabel ? labels[status] : null}
    </span>
  );
}
