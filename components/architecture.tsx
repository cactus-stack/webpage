import { AgentDiagram } from "@/components/agent-diagram";
import { Reveal } from "@/components/reveal";

export function Architecture() {
  return (
    <section
      aria-labelledby="architecture-title"
      className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:px-10 lg:py-36"
    >
      <Reveal>
        <h2
          id="architecture-title"
          className="max-w-[11ch] text-4xl leading-[0.98] font-medium tracking-[-0.045em] text-balance md:text-5xl"
        >
          Representative architecture.
        </h2>
        <p className="mt-6 max-w-[52ch] leading-relaxed text-pretty text-muted">
          The orchestrator owns routing and policy. Typed tools keep agents
          separate from data, APIs and event workflows.
        </p>
      </Reveal>
      <Reveal delay={0.1} className="mt-12 sm:mt-14">
        <div
          role="group"
          aria-labelledby="architecture-diagram-title"
          aria-describedby="architecture-diagram-description"
          className="overflow-hidden rounded-2xl border border-edge bg-surface"
        >
          <div className="flex min-h-12 items-center border-b border-edge bg-surface-strong/45 px-4 py-3 sm:px-5">
            <p
              id="architecture-diagram-title"
              className="font-mono text-xs font-medium tracking-[0.1em] text-foreground uppercase"
            >
              Representative agent topology
            </p>
          </div>
          <AgentDiagram />
        </div>
      </Reveal>
    </section>
  );
}
