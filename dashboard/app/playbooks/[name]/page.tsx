import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/Card';
import { Markdown } from '@/components/Markdown';
import { CopyButton } from '@/components/CopyButton';
import { getAllPlaybooks, getPlaybook } from '@/lib/harness';

export function generateStaticParams() {
  return getAllPlaybooks().map((p) => ({ name: p.slug }));
}

const prompts: Record<string, string> = {
  'daily-ops': 'Run daily ops per .claude/playbooks/daily-ops.md.',
  'weekly-review': 'Run the weekly review per .claude/playbooks/weekly-review.md.',
  'launch-product':
    'Launch a new product end-to-end per .claude/playbooks/launch-product.md. Ask me which SKU.',
  'festival-sale':
    'Plan and execute the next festival sale per .claude/playbooks/festival-sale.md.',
  'scale-winner':
    'Scale our top winner per .claude/playbooks/scale-winner.md after marketing-analytics reconciliation.',
  'kill-loser':
    'Run kill-loser per .claude/playbooks/kill-loser.md on the worst current ad set / product.',
};

export default async function PlaybookDetail({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const doc = getPlaybook(name);
  if (!doc) return notFound();
  const prompt = prompts[doc.slug] ?? `Run ${doc.title} per .claude/playbooks/${doc.slug}.md.`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs text-ink-muted">
        <Link href="/" className="hover:text-ink">Dashboard</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/playbooks" className="hover:text-ink">Playbooks</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-ink">{doc.title}</span>
      </div>

      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Link href="/playbooks" className="inline-flex items-center gap-1 text-xs text-ink-dim hover:text-ink">
            <ArrowLeft className="h-3 w-3" /> All playbooks
          </Link>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{doc.title}</h1>
          <p className="mt-1 text-xs font-mono text-ink-muted">.claude/playbooks/{doc.slug}.md</p>
        </div>
        <CopyButton text={prompt} label="Copy run prompt" />
      </div>

      <Card>
        <CardHeader title="SOP" subtitle="Read top-to-bottom · safety-rule footer is non-negotiable" />
        <CardBody>
          <Markdown source={doc.body} />
        </CardBody>
      </Card>
    </div>
  );
}
