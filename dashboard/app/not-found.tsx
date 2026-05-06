import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="grid place-items-center py-24 text-center">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">404 · Not found</h1>
        <p className="text-sm text-ink-dim">That agent or playbook doesn’t exist in this harness.</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-saffron-500 px-4 py-2 text-sm font-semibold text-bg shadow-glow hover:bg-saffron-400"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
