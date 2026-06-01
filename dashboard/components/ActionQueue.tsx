'use client';
import { useState } from 'react';
import type { ActionItem } from '@/data/mock';
import { Check, Copy, Circle } from 'lucide-react';
import { cn } from '@/lib/cn';

const priorityMeta = {
  red:    { dot: 'bg-bad',   ring: 'border-bad/30',  text: 'text-bad' },
  yellow: { dot: 'bg-warn',  ring: 'border-warn/30', text: 'text-warn' },
  info:   { dot: 'bg-teal-400', ring: 'border-teal-500/30', text: 'text-teal-300' },
} as const;

export function ActionQueue({ items }: { items: ActionItem[] }) {
  const [done, setDone] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const reds = items.filter((i) => i.priority === 'red');
  const yellows = items.filter((i) => i.priority === 'yellow');
  const remaining = items.filter((i) => !done.has(i.id));

  const onCopy = (item: ActionItem) => {
    if (!item.prompt) return;
    navigator.clipboard?.writeText(item.prompt);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1600);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 text-[11px]">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-bad" />
          <span className="text-ink-dim">{reds.length} red</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-warn" />
          <span className="text-ink-dim">{yellows.length} yellow</span>
        </span>
        <span className="ml-auto text-ink-muted">
          {done.size} of {items.length} cleared
        </span>
      </div>

      <ul className="space-y-1.5">
        {items.map((item) => {
          const meta = priorityMeta[item.priority];
          const isDone = done.has(item.id);
          const isCopied = copiedId === item.id;
          return (
            <li
              key={item.id}
              className={cn(
                'group flex items-start gap-3 rounded-xl border bg-white/[0.02] p-3 transition',
                isDone ? 'opacity-40' : meta.ring,
              )}
            >
              <button
                onClick={() =>
                  setDone((d) => {
                    const next = new Set(d);
                    if (next.has(item.id)) next.delete(item.id);
                    else next.add(item.id);
                    return next;
                  })
                }
                className="mt-0.5 shrink-0"
                aria-label={isDone ? 'Mark not done' : 'Mark done'}
              >
                {isDone ? (
                  <Check className="h-4 w-4 text-ok" />
                ) : (
                  <Circle className={cn('h-4 w-4', meta.text)} />
                )}
              </button>

              <div className="min-w-0 flex-1">
                <div className={cn('text-sm leading-snug', isDone && 'line-through text-ink-muted')}>
                  {item.task}
                </div>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] text-ink-muted">
                  <span>→ {item.owner}</span>
                  <span>· {item.eta}</span>
                  <span className={cn('uppercase tracking-wider', meta.text)}>{item.priority}</span>
                </div>
              </div>

              {item.prompt ? (
                <button
                  onClick={() => onCopy(item)}
                  className={cn(
                    'shrink-0 rounded-md border border-bg-border bg-white/5 p-1.5 text-ink-muted opacity-0 transition group-hover:opacity-100',
                    isCopied && 'border-ok/40 bg-ok/10 text-ok opacity-100',
                  )}
                  title="Copy run prompt"
                >
                  {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </button>
              ) : null}
            </li>
          );
        })}
      </ul>

      {remaining.length === 0 && (
        <div className="rounded-xl border border-ok/30 bg-ok/5 p-4 text-center text-sm text-ok">
          🎉 Action queue cleared. Run daily-ops again tomorrow.
        </div>
      )}
    </div>
  );
}
