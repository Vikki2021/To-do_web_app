import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { sources } from '@/lib/env';

export const metadata: Metadata = {
  title: 'Dhanwantari · Dropshipping Ops',
  description:
    'Operator dashboard for the dropshipping automation harness — 9 agents, 4 skills, 6 playbooks for an Indian dropshipping store.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const headerSources = {
    shopify: sources.shopify,
    meta: sources.meta,
    notion: sources.notion.festival,
  };

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-bg text-ink antialiased">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-hero" aria-hidden />
          <div className="pointer-events-none absolute inset-0 -z-10 subtle-grid opacity-40" aria-hidden />
          <Header sources={headerSources} />
          <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
          <footer className="border-t border-bg-border/60 py-8 text-center text-xs text-ink-muted">
            Built on the Claude Code dropshipping harness ·{' '}
            <a
              href="https://github.com/Vikki2021/To-do_web_app"
              className="text-teal-300 underline-offset-2 hover:underline"
            >
              repo
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
