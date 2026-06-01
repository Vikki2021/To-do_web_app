'use client';
import { useState } from 'react';
import type { LaunchReadiness } from '@/data/mock';
import { Pill } from './Pill';
import { CopyButton } from './CopyButton';
import { cn } from '@/lib/cn';
import { ChevronDown } from 'lucide-react';

const verdictMeta = {
  green:  { tone: 'ok' as const,  emoji: '🟢', text: 'Approved to launch' },
  yellow: { tone: 'warn' as const, emoji: '🟡', text: 'Launch with monitoring' },
  red:    { tone: 'bad' as const,  emoji: '🔴', text: 'Launch BLOCKED' },
};

export function LaunchReadyGate({ data }: { data: LaunchReadiness }) {
  const [open, setOpen] = useState<string | null>(null);
  const overall = verdictMeta[data.verdict];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-medium text-ink">{data.product}</div>
          <div className="text-[11px] text-ink-muted">
            ETA to fix all RED items: <span className="text-ink-dim">{data.etaToFix}</span>
          </div>
        </div>
        <Pill tone={overall.tone}>{overall.emoji} {overall.text}</Pill>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {data.domains.map((d) => {
          const tone = verdictMeta[d.verdict];
          const isOpen = open === d.key;
          return (
            <button
              key={d.key}
              onClick={() => setOpen(isOpen ? null : d.key)}
              className={cn(
                'flex flex-col items-start gap-1 rounded-xl border bg-white/[0.02] p-2.5 text-left transition',
                d.verdict === 'red'    && 'border-bad/30  hover:border-bad/60  hover:bg-bad/5',
                d.verdict === 'yellow' && 'border-warn/30 hover:border-warn/60 hover:bg-warn/5',
                d.verdict === 'green'  && 'border-ok/30   hover:border-ok/60   hover:bg-ok/5',
              )}
            >
              <span className="text-[10px] uppercase tracking-wider text-ink-muted">{d.label}</span>
              <span className="flex w-full items-center justify-between">
                <span className={cn(
                  'font-mono text-sm',
                  d.verdict === 'red' && 'text-bad',
                  d.verdict === 'yellow' && 'text-warn',
                  d.verdict === 'green' && 'text-ok',
                )}>
                  {d.pass}<span className="text-ink-muted">/{d.total}</span>
                </span>
                {d.blockers.length > 0 && (
                  <ChevronDown className={cn('h-3 w-3 text-ink-muted transition', isOpen && 'rotate-180')} />
                )}
              </span>
              <span className="text-[10px]">{tone.emoji}</span>
            </button>
          );
        })}
      </div>

      {open && data.domains.find((d) => d.key === open)?.blockers.length ? (
        <div className="rounded-xl border border-bad/20 bg-bad/5 p-3">
          <div className="mb-1.5 text-[10.5px] uppercase tracking-wider text-bad/80">
            Blockers · {data.domains.find((d) => d.key === open)?.label}
          </div>
          <ul className="space-y-1 text-xs text-ink-dim">
            {data.domains.find((d) => d.key === open)?.blockers.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 text-bad">▸</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <CopyButton
          text={`Run the launch-ready skill on ${data.product}. Output all RED + YELLOW items.`}
          label="Re-run launch-ready"
        />
        <CopyButton
          text={`Fix the ${data.product} product page: set compareAtPrice ₹1,679, add COD badge, fix slug to ${data.productHandle}, rewrite description per conversion-page-blueprint skill.`}
          label="Fix product page"
        />
      </div>
    </div>
  );
}
