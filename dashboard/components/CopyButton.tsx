'use client';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/cn';

export function CopyButton({
  text,
  label = 'Copy run prompt',
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-bg-border bg-white/5 px-3.5 py-1.5 text-xs font-medium text-ink-dim transition',
        copied
          ? 'border-ok/40 bg-ok/10 text-ok'
          : 'hover:border-saffron-500/30 hover:bg-saffron-500/10 hover:text-saffron-200',
        className,
      )}
      aria-live="polite"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? 'Copied — paste into Claude Code' : label}
    </button>
  );
}
