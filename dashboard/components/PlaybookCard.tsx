'use client';
import Link from 'next/link';
import {
  Sunrise,
  CalendarRange,
  Rocket,
  Sparkles,
  TrendingUp,
  OctagonX,
  Play,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { motion } from 'framer-motion';

const icons: Record<string, LucideIcon> = {
  Sunrise,
  CalendarRange,
  Rocket,
  Sparkles,
  TrendingUp,
  OctagonX,
};

export function PlaybookCard({
  slug,
  title,
  desc,
  accent = 'saffron',
  icon = 'Play',
  prompt,
  index = 0,
}: {
  slug: string;
  title: string;
  desc: string;
  accent?: 'saffron' | 'teal' | 'cream';
  icon?: string;
  prompt: string;
  index?: number;
}) {
  const Icon = icons[icon] ?? Play;

  function copyPrompt(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard?.writeText(prompt);
    const btn = e.currentTarget as HTMLButtonElement;
    btn.dataset.copied = 'true';
    setTimeout(() => delete btn.dataset.copied, 1600);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.32, ease: 'easeOut' }}
    >
      <Link
        href={`/playbooks/${slug}`}
        className={cn(
          'group relative block overflow-hidden rounded-2xl border border-bg-border bg-bg-card p-5 shadow-soft transition',
          'hover:border-saffron-500/40 hover:shadow-glow',
        )}
      >
        <div className="flex items-start gap-3">
          <div
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border',
              accent === 'saffron' && 'border-saffron-500/30 bg-saffron-500/10 text-saffron-300',
              accent === 'teal' && 'border-teal-500/30 bg-teal-500/10 text-teal-300',
              accent === 'cream' && 'border-cream-300/30 bg-cream-300/10 text-cream-200',
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm font-semibold text-ink">{title}</h4>
            </div>
            <p className="mt-1 line-clamp-2 text-xs text-ink-muted">{desc}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[11px] text-ink-muted">{slug}.md</span>
          <button
            onClick={copyPrompt}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border border-bg-border bg-white/5 px-3 py-1 text-[11px] font-medium text-ink-dim transition',
              'hover:border-saffron-500/30 hover:bg-saffron-500/10 hover:text-saffron-200',
              'data-[copied=true]:border-ok/30 data-[copied=true]:bg-ok/10 data-[copied=true]:text-ok',
            )}
            aria-label={`Copy prompt to run ${title}`}
          >
            <Play className="h-3 w-3" />
            <span className="data-[copied=true]:hidden group-data-[copied=true]:hidden">Copy run prompt</span>
          </button>
        </div>
      </Link>
    </motion.div>
  );
}
