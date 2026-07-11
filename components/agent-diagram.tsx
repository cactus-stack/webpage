import type { ReactNode } from "react";
import {
  Brain,
  ChatCircleDots,
  Database,
  Globe,
  HardDrives,
  Queue,
  Robot,
} from "@phosphor-icons/react/dist/ssr";

// Design space for the desktop diagram; modules and paths share it via
// percentage positioning against the same viewBox. The layout follows the
// canonical AI-engineering pipeline, flowing left to right:
// request -> orchestrator -> agents -> backend services
const VIEW_W = 1000;
const VIEW_H = 420;

type Anchor = { x: number; y: number };

const CLIENT: Anchor = { x: 100, y: 210 };
const ORCHESTRATOR: Anchor = { x: 350, y: 210 };
const AGENTS: (Anchor & { title: string; sub: string })[] = [
  { x: 640, y: 70, title: "Retrieval agent", sub: "RAG pipelines" },
  { x: 640, y: 210, title: "Data agent", sub: "parsers, DTOs" },
  { x: 640, y: 350, title: "Workflow agent", sub: "Step Functions" },
];
const SERVICES: (Anchor & { label: string; Icon: typeof Database })[] = [
  { x: 900, y: 50, label: "Vector store", Icon: HardDrives },
  { x: 900, y: 150, label: "MongoDB", Icon: Database },
  { x: 900, y: 260, label: "REST APIs", Icon: Globe },
  { x: 900, y: 360, label: "SQS / EventBridge", Icon: Queue },
];

// Rails model explicit trunks and junctions. Nodes stay opaque above this
// layer, so connections emerge from their borders at every responsive scale.
const RAILS = [
  "M100,210 L350,210",
  "M350,210 L480,210",
  "M480,210 C505,210 520,70 640,70",
  "M480,210 L640,210",
  "M480,210 C505,210 520,350 640,350",
  "M640,70 C755,70 790,50 900,50",
  "M640,210 L770,210",
  "M770,210 C800,210 815,150 900,150",
  "M770,210 C800,210 815,260 900,260",
  "M640,350 L770,350",
  "M770,350 C800,350 815,260 900,260",
  "M770,350 C800,350 815,360 900,360",
];

// One signal per meaningful connection keeps the motion informative instead
// of turning every rail into an animated decoration.
const SIGNAL_PATHS = [
  "M100,210 L350,210",
  "M350,210 L480,210 C505,210 520,70 640,70",
  "M350,210 L640,210",
  "M350,210 L480,210 C505,210 520,350 640,350",
  "M640,70 C755,70 790,50 900,50",
  "M640,210 L770,210 C800,210 815,150 900,150",
  "M640,210 L770,210 C800,210 815,260 900,260",
  "M640,350 L770,350 C800,350 815,260 900,260",
  "M640,350 L770,350 C800,350 815,360 900,360",
];

const JUNCTIONS = [
  { x: 480, y: 210 },
  { x: 770, y: 210 },
  { x: 770, y: 350 },
];
const DURATIONS = [3.6, 4.4, 5, 4.1, 4.7, 3.9, 4.6, 4.2, 5.2];

const pct = (anchor: Anchor) => ({
  left: `${(anchor.x / VIEW_W) * 100}%`,
  top: `${(anchor.y / VIEW_H) * 100}%`,
});

function DiagramNode({
  children,
  className = "",
  icon,
  emphasis = false,
  ports = "both",
}: {
  children: ReactNode;
  className?: string;
  icon: ReactNode;
  emphasis?: boolean;
  ports?: "in" | "out" | "both";
}) {
  return (
    <div
      className={`relative z-10 isolate flex rounded-xl border bg-background ${
        emphasis
          ? "border-accent/60"
          : "border-edge"
      } ${className}`}
    >
      {ports !== "out" && (
        <span
          aria-hidden
          className="absolute top-1/2 left-0 hidden size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent bg-background xl:block"
        />
      )}
      {ports !== "in" && (
        <span
          aria-hidden
          className="absolute top-1/2 right-0 hidden size-2 translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent bg-background xl:block"
        />
      )}
      <span
        className={`flex w-11 shrink-0 items-center justify-center rounded-l-[11px] border-r ${
          emphasis
            ? "border-accent/25 bg-accent/10 text-accent"
            : "border-edge bg-surface-strong/55 text-muted"
        }`}
      >
        {icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col justify-center px-3.5 py-2.5">
        {children}
      </span>
    </div>
  );
}

function ClientNode() {
  return (
    <DiagramNode
      ports="out"
      className="min-h-16 w-full xl:w-[170px]"
      icon={<ChatCircleDots size={18} aria-hidden />}
    >
      <span className="text-sm font-medium leading-5 tracking-tight whitespace-nowrap">
        User request
      </span>
      <span className="font-mono text-xs leading-4 tracking-[0.03em] text-muted whitespace-nowrap">
        chat, API calls
      </span>
    </DiagramNode>
  );
}

function OrchestratorNode() {
  return (
    <DiagramNode
      emphasis
      className="min-h-[68px] w-full xl:w-[198px]"
      icon={<Brain size={20} aria-hidden />}
    >
      <span className="text-sm font-medium leading-5 tracking-tight whitespace-nowrap">
        LLM orchestrator
      </span>
      <span className="font-mono text-xs leading-4 tracking-[0.03em] text-muted whitespace-nowrap">
        OpenAI Agents SDK
      </span>
    </DiagramNode>
  );
}

function AgentNode({ title, sub }: { title: string; sub: string }) {
  return (
    <DiagramNode
      className="min-h-16 w-full xl:w-[190px]"
      icon={<Robot size={18} aria-hidden />}
    >
      <span className="text-sm font-medium leading-5 tracking-tight whitespace-nowrap">
        {title}
      </span>
      <span className="font-mono text-xs leading-4 tracking-[0.03em] text-muted whitespace-nowrap">
        {sub}
      </span>
    </DiagramNode>
  );
}

function ServiceNode({
  label,
  Icon,
}: {
  label: string;
  Icon: typeof Database;
}) {
  return (
    <DiagramNode
      ports="in"
      className="min-h-12 w-full xl:w-[164px]"
      icon={<Icon size={16} aria-hidden />}
    >
      <span className="font-mono text-xs leading-4 tracking-[0.02em]">
        {label}
      </span>
    </DiagramNode>
  );
}

/** Vertical animated connector for the mobile stack */
function FlowConnector() {
  return (
    <svg width="6" height="32" viewBox="0 0 6 32" aria-hidden>
      <path
        d="M3,0 L3,32"
        fill="none"
        stroke="var(--diagram-rail)"
        strokeWidth="1.25"
      />
      <path
        d="M3,0 L3,32"
        fill="none"
        stroke="var(--accent)"
        strokeOpacity="0.75"
        strokeWidth="2.25"
        strokeLinecap="round"
        className="flow-dash"
      />
    </svg>
  );
}

function FanoutConnector() {
  return (
    <div className="relative h-8 w-full" aria-hidden>
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[var(--diagram-rail)] md:bottom-4" />
      <div className="absolute top-4 right-[16.666%] left-[16.666%] hidden h-px bg-[var(--diagram-rail)] md:block" />
      {["16.666%", "50%", "83.333%"].map((left) => (
        <div
          key={left}
          className="absolute top-4 bottom-0 hidden w-px bg-[var(--diagram-rail)] md:block"
          style={{ left }}
        />
      ))}
    </div>
  );
}

function Pulses() {
  return (
    <>
      {SIGNAL_PATHS.map((d, i) => (
        <circle
          key={d}
          r="3.5"
          fill="var(--accent)"
          className="motion-reduce:hidden"
        >
          <animateMotion
            dur={`${DURATIONS[i]}s`}
            begin={`${-i * 1.15}s`}
            repeatCount="indefinite"
            path={d}
          />
        </circle>
      ))}
    </>
  );
}

/**
 * Animated 2D architecture diagram following the canonical AI-engineering
 * pipeline, left to right: user request, LLM orchestrator, agents, and the
 * backend services they call. Semantic modules sit over SVG connectors with
 * explicit junctions and discrete request signals. Server-rendered; all
 * motion hides under prefers-reduced-motion.
 */
export function AgentDiagram() {
  return (
    <div className="p-4 sm:p-6">
      <p id="architecture-diagram-description" className="sr-only">
        A user request enters an LLM orchestrator. The orchestrator routes work
        to retrieval, data and workflow agents. Those agents use a vector
        store, MongoDB, REST APIs, SQS and EventBridge.
      </p>

      <div className="relative mx-auto hidden h-5 max-w-[1000px] xl:block">
        {[
          { label: "Input", x: 100 },
          { label: "Control plane", x: 350 },
          { label: "Agent layer", x: 640 },
          { label: "Services", x: 900 },
        ].map(({ label, x }) => (
          <span
            key={label}
            className="absolute -translate-x-1/2 font-mono text-xs font-medium tracking-[0.09em] text-muted uppercase"
            style={{ left: `${(x / VIEW_W) * 100}%` }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Desktop: positioned modules over an SVG connector layer */}
      <div
        className="relative mx-auto mt-3 hidden max-w-[1000px] xl:block"
        style={{ aspectRatio: `${VIEW_W}/${VIEW_H}` }}
      >
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 z-0 h-full w-full"
          aria-hidden
        >
          {RAILS.map((d) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke="var(--diagram-rail)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          ))}
          {JUNCTIONS.map(({ x, y }) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r="4"
              fill="var(--background)"
              stroke="var(--accent)"
              strokeWidth="2"
            />
          ))}
          <Pulses />
        </svg>
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={pct(CLIENT)}
        >
          <ClientNode />
        </div>
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={pct(ORCHESTRATOR)}
        >
          <OrchestratorNode />
        </div>
        {AGENTS.map((agent) => (
          <div
            key={agent.title}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={pct(agent)}
          >
            <AgentNode title={agent.title} sub={agent.sub} />
          </div>
        ))}
        {SERVICES.map((service) => (
          <div
            key={service.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={pct(service)}
          >
            <ServiceNode label={service.label} Icon={service.Icon} />
          </div>
        ))}
      </div>

      {/* Mobile and tablet: parallel branches preserve the graph semantics. */}
      <div className="mx-auto flex w-full max-w-4xl flex-col items-stretch gap-0 xl:hidden">
        <ClientNode />
        <div className="self-center">
          <FlowConnector />
        </div>
        <OrchestratorNode />
        <FanoutConnector />
        <div className="grid w-full gap-6 md:grid-cols-3 md:gap-4">
          {[
            { agent: AGENTS[0], services: [SERVICES[0]] },
            { agent: AGENTS[1], services: [SERVICES[1], SERVICES[2]] },
            { agent: AGENTS[2], services: [SERVICES[2], SERVICES[3]] },
          ].map(({ agent, services }) => (
            <section key={agent.title} aria-label={`${agent.title} connections`}>
              <AgentNode title={agent.title} sub={agent.sub} />
              <div className="mx-auto h-5 w-px bg-[var(--diagram-rail)]" aria-hidden />
              <div className="grid gap-2">
                {services.map((service) => (
                  <ServiceNode
                    key={`${agent.title}-${service.label}`}
                    label={service.label}
                    Icon={service.Icon}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
