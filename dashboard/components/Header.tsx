'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Bot, Settings2 } from 'lucide-react';
import { cn } from '@/lib/cn';

const nav = [
  { href: '/', label: 'Dashboard' },
  { href: '/agents', label: 'Agents' },
  { href: '/playbooks', label: 'Playbooks' },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-bg-border/80 bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-6 px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-saffron-400 to-teal-400 text-bg shadow-glow">
            <Bot className="h-4 w-4" />
          </div>
          <div className="leading-none">
            <div className="text-sm font-semibold tracking-tight">
              <span className="gradient-text">Dhanwantari</span>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-ink-muted">
              Dropshipping ops
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => {
            const active =
              pathname === n.href ||
              (n.href !== '/' && pathname?.startsWith(n.href));
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-sm transition',
                  active
                    ? 'bg-white/10 text-ink'
                    : 'text-ink-dim hover:bg-white/5 hover:text-ink',
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 rounded-full border border-bg-border bg-bg-elev px-2.5 py-1 text-[11px] text-ink-dim sm:inline-flex">
            <Activity className="h-3 w-3 text-ok live-dot" />
            Demo data
          </span>
          <button className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-bg-border bg-bg-elev text-ink-dim transition hover:border-saffron-500/30 hover:text-saffron-300">
            <Settings2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
