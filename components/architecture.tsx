import { AgentDiagram } from "@/components/agent-diagram";
import { Reveal } from "@/components/reveal";

export function Architecture() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 lg:py-32">
      <Reveal>
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          Agent systems, end to end
        </h2>
        <p className="mt-4 max-w-[65ch] leading-relaxed text-pretty text-muted">
          How I wire LLM agents into production: one orchestrator, typed agent
          tools, and the backend services behind them.
        </p>
      </Reveal>
      <Reveal delay={0.1} className="mt-14">
        <div className="rounded-[2rem] bg-foreground/[0.04] p-2 ring-1 ring-foreground/10">
          <div className="relative overflow-hidden rounded-[calc(2rem-0.5rem)] bg-surface bg-[radial-gradient(42rem_22rem_at_50%_0%,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_70%)] py-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] sm:py-10">
            <AgentDiagram />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
