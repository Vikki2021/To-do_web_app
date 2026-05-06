import { AgentCard } from '@/components/AgentCard';
import { agents as runtime } from '@/data/mock';
import { getAllAgents } from '@/lib/harness';

export default function AgentsIndex() {
  const agents = getAllAgents();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Agents</h1>
        <p className="mt-1 text-sm text-ink-dim">
          Each agent owns one pillar. Decision rules live in skills, not in the agent prompts.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {agents.map((doc) => {
          const r = runtime.find((x) => x.slug === doc.slug);
          return <AgentCard key={doc.slug} doc={doc} runtime={r} />;
        })}
      </div>
    </div>
  );
}
