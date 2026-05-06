import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

const tones = {
  saffron: 'bg-saffron-500/10 text-saffron-300 border-saffron-500/30',
  teal: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
  cream: 'bg-cream-300/10 text-cream-200 border-cream-300/30',
  ok: 'bg-ok/10 text-ok border-ok/30',
  warn: 'bg-warn/10 text-warn border-warn/30',
  bad: 'bg-bad/10 text-bad border-bad/30',
  neutral: 'bg-white/5 text-ink-dim border-white/10',
} as const;

export type PillTone = keyof typeof tones;

export function Pill({
  children,
  tone = 'neutral',
  className,
  size = 'md',
}: {
  children: ReactNode;
  tone?: PillTone;
  className?: string;
  size?: 'sm' | 'md';
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
