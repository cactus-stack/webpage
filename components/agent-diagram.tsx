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

// Design space for the desktop diagram; cards and paths share it via
// percentage positioning against the same viewBox. The layout follows the
// canonical AI-engineering pipeline, flowing left to right:
// request -> orchestrator -> agents -> backend services
const VIEW_W = 1000;
const VIEW_H = 440;

type Anchor = { x: number; y: number };

const CLIENT: Anchor = { x: 100, y: 220 };
const ORCHESTRATOR: Anchor = { x: 350, y: 220 };
const AGENTS: (Anchor & { title: string; sub: string })[] = [
  { x: 640, y: 80, title: "Retrieval agent", sub: "rag pipelines" },
  { x: 640, y: 220, title: "Data agent", sub: "parsers, dtos" },
  { x: 640, y: 360, title: "Workflow agent", sub: "step functions" },
];
const SERVICES: (Anchor & { label: string; Icon: typeof Database })[] = [
  { x: 900, y: 55, label: "Vector store", Icon: HardDrives },
  { x: 900, y: 160, label: "MongoDB", Icon: Database },
  { x: 900, y: 265, label: "REST APIs", Icon: Globe },
  { x: 900, y: 370, label: "SQS / EventBridge", Icon: Queue },
];

// Center-to-center connections; the cards render above the SVG layer and
// mask the path endpoints. Two branches share the REST APIs node to show
// decoupled tools.
const PATHS = [
  "M100,220 C180,220 270,220 350,220",
  "M350,220 C495,220 495,80 640,80",
  "M350,220 C450,220 540,220 640,220",
  "M350,220 C495,220 495,360 640,360",
  "M640,80 C770,80 770,55 900,55",
  "M640,220 C770,220 770,160 900,160",
  "M640,220 C770,220 770,265 900,265",
  "M640,360 C770,360 770,265 900,265",
  "M640,360 C770,360 770,370 900,370",
];
const DURATIONS = [3.6, 4.4, 5, 4.1, 4.7, 3.9, 4.6, 4.2, 5.2];

const pct = (anchor: Anchor) => ({
  left: `${(anchor.x / VIEW_W) * 100}%`,
  top: `${(anchor.y / VIEW_H) * 100}%`,
});

function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-background ring-1 ring-foreground/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] ${className}`}
    >
      {children}
    </div>
  );
}

function ClientCard() {
  return (
    <GlassCard className="flex items-center gap-3 px-4 py-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground/[0.05] text-accent">
        <ChatCircleDots size={16} />
      </span>
      <span className="flex flex-col">
        <span className="text-sm font-medium tracking-tight whitespace-nowrap">
          User request
        </span>
        <span className="font-mono text-[10px] tracking-[0.08em] text-muted whitespace-nowrap">
          chat, api calls
        </span>
      </span>
    </GlassCard>
  );
}

function OrchestratorCard() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="animate-breathe absolute -inset-3 rounded-full bg-accent/25 blur-2xl"
      />
      <GlassCard className="relative flex items-center gap-3.5 px-5 py-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent ring-1 ring-accent/30">
          <Brain size={20} />
        </span>
        <span className="flex flex-col">
          <span className="text-sm font-medium tracking-tight whitespace-nowrap">
            LLM orchestrator
          </span>
          <span className="font-mono text-[10px] tracking-[0.08em] text-muted whitespace-nowrap">
            openai agents sdk
          </span>
        </span>
      </GlassCard>
    </div>
  );
}

function AgentCard({ title, sub }: { title: string; sub: string }) {
  return (
    <GlassCard className="flex items-center gap-3 px-4 py-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground/[0.05] text-accent">
        <Robot size={16} />
      </span>
      <span className="flex flex-col">
        <span className="text-sm font-medium tracking-tight whitespace-nowrap">
          {title}
        </span>
        <span className="font-mono text-[10px] tracking-[0.08em] text-muted whitespace-nowrap">
          {sub}
        </span>
      </span>
    </GlassCard>
  );
}

function ServiceCard({
  label,
  Icon,
}: {
  label: string;
  Icon: typeof Database;
}) {
  return (
    <GlassCard className="flex items-center gap-2.5 px-3.5 py-2.5">
      <Icon size={16} className="shrink-0 text-muted" />
      <span className="font-mono text-xs whitespace-nowrap">{label}</span>
    </GlassCard>
  );
}

function Pulses() {
  return (
    <>
      {PATHS.map((d, i) => (
        <g key={i}>
          {/* Request pulse, flowing left to right */}
          <circle
            r="6.5"
            fill="url(#agent-pulse)"
            className="motion-reduce:hidden"
          >
            <animateMotion
              dur={`${DURATIONS[i]}s`}
              begin={`${-i * 1.3}s`}
              repeatCount="indefinite"
              path={d}
            />
          </circle>
          {/* Response pulse, traveling back at lower intensity */}
          <circle
            r="4.5"
            fill="url(#agent-pulse)"
            opacity="0.6"
            className="motion-reduce:hidden"
          >
            <animateMotion
              dur={`${DURATIONS[(i + 3) % PATHS.length]}s`}
              begin={`${-i * 1.3 - 2.1}s`}
              repeatCount="indefinite"
              keyPoints="1;0"
              keyTimes="0;1"
              calcMode="linear"
              path={d}
            />
          </circle>
        </g>
      ))}
    </>
  );
}

/**
 * Animated 2D architecture diagram following the canonical AI-engineering
 * pipeline, left to right: user request, LLM orchestrator, agents, and the
 * backend services they call. Real UI cards over SVG connectors with a
 * flowing bus current and request/response pulses. Server-rendered; all
 * motion hides under prefers-reduced-motion.
 */
export function AgentDiagram() {
  return (
    <div className="p-4 sm:p-6">
      {/* Desktop: positioned cards over an SVG connector layer */}
      <div
        className="relative mx-auto hidden max-w-[1000px] md:block"
        style={{ aspectRatio: `${VIEW_W}/${VIEW_H}` }}
      >
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <radialGradient id="agent-pulse">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="1" />
              <stop offset="55%" stopColor="var(--accent)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Static rails */}
          {PATHS.map((d) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke="var(--accent)"
              strokeOpacity="0.2"
              strokeWidth="1.25"
            />
          ))}
          {/* Flowing bus current */}
          {PATHS.map((d, i) => (
            <path
              key={`flow-${d}`}
              d={d}
              fill="none"
              stroke="var(--accent)"
              strokeOpacity="0.75"
              strokeWidth="2.25"
              strokeLinecap="round"
              className="flow-dash"
              style={{ animationDelay: `${-i * 0.24}s` }}
            />
          ))}
          <Pulses />
        </svg>
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={pct(CLIENT)}
        >
          <ClientCard />
        </div>
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={pct(ORCHESTRATOR)}
        >
          <OrchestratorCard />
        </div>
        {AGENTS.map((agent) => (
          <div
            key={agent.title}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={pct(agent)}
          >
            <AgentCard title={agent.title} sub={agent.sub} />
          </div>
        ))}
        {SERVICES.map((service) => (
          <div
            key={service.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={pct(service)}
          >
            <ServiceCard label={service.label} Icon={service.Icon} />
          </div>
        ))}
      </div>

      {/* Mobile: vertical stack with hairline connectors */}
      <div className="flex flex-col items-center gap-0 md:hidden">
        <ClientCard />
        <span aria-hidden className="h-6 w-px bg-edge" />
        <OrchestratorCard />
        <span aria-hidden className="h-6 w-px bg-edge" />
        <div className="flex w-full flex-col gap-2">
          {AGENTS.map((agent) => (
            <AgentCard key={agent.title} title={agent.title} sub={agent.sub} />
          ))}
        </div>
        <span aria-hidden className="h-6 w-px bg-edge" />
        <div className="grid w-full grid-cols-2 gap-2">
          {SERVICES.map((service) => (
            <div key={service.label} className="last:col-span-2">
              <ServiceCard label={service.label} Icon={service.Icon} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
