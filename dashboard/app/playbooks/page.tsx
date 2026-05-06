import { PlaybookCard } from '@/components/PlaybookCard';
import { playbooks } from '@/data/mock';

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

export default function PlaybooksIndex() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Playbooks</h1>
        <p className="mt-1 text-sm text-ink-dim">
          Repeatable workflows. Click a card for the full SOP, or copy the run prompt to paste into Claude Code.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {playbooks.map((p, i) => (
          <PlaybookCard
            key={p.slug}
            slug={p.slug}
            title={p.title}
            desc={p.desc}
            accent={p.accent as 'saffron' | 'teal' | 'cream'}
            icon={p.icon}
            prompt={prompts[p.slug] ?? `Run ${p.title} per .claude/playbooks/${p.slug}.md.`}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
