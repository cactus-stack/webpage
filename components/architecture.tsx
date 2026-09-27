"use client";

import { animate, useInView, useReducedMotion, type AnimationPlaybackControls } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Brackets } from "@/components/hud";
import { Reveal } from "@/components/reveal";
import { TitleCard } from "@/components/title-card";

type NodeId =
  | "c1"
  | "c2"
  | "c3"
  | "edge"
  | "orch"
  | "tools"
  | "retrieval"
  | "models"
  | "gate"
  | "reply";

type DiagramNode = {
  id: NodeId;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub: string;
  /** Put the sub-label on the bottom edge, for nodes with inner content. */
  subAtBottom?: boolean;
};

// Canvas is 1280 x 660. Columns read left to right: channels, edge,
// orchestrator, capabilities, validation gate, reply.
const nodes: readonly DiagramNode[] = [
  { id: "c1", x: 40, y: 170, w: 150, h: 58, label: "WhatsApp", sub: "webhooks" },
  { id: "c2", x: 40, y: 281, w: 150, h: 58, label: "Web app", sub: "REST · SSE" },
  { id: "c3", x: 40, y: 392, w: 150, h: 58, label: "Internal", sub: "service APIs" },
  { id: "edge", x: 250, y: 270, w: 150, h: 80, label: "Edge", sub: "gateway · auth" },
  { id: "orch", x: 460, y: 236, w: 200, h: 148, label: "Orchestrator", sub: "agent runtime" },
  { id: "tools", x: 730, y: 150, w: 180, h: 70, label: "Tools", sub: "typed Python · Pydantic" },
  { id: "retrieval", x: 730, y: 275, w: 180, h: 70, label: "Retrieval", sub: "embed · search · rerank" },
  { id: "models", x: 730, y: 400, w: 180, h: 70, label: "Models", sub: "Bedrock · OpenAI" },
  { id: "gate", x: 980, y: 222, w: 120, h: 176, label: "Gate", sub: "3 / 3 to ship", subAtBottom: true },
  { id: "reply", x: 1150, y: 280, w: 100, h: 60, label: "Reply", sub: "to user" },
];

const edges = {
  c1: "M190 199 H220 V310 H250",
  c2: "M190 310 H250",
  c3: "M190 421 H220 V310 H250",
  edgeOrch: "M400 310 H460",
  orchTools: "M660 272 H695 V185 H730",
  orchRetrieval: "M660 310 H730",
  orchModels: "M660 348 H695 V435 H730",
  orchGate: "M600 236 V118 H1040 V222",
  gateReply: "M1100 310 H1150",
  orchState: "M560 384 V584",
} as const;

type EdgeId = keyof typeof edges;

// Dashed rails: every hop reports up to telemetry; state and async work
// settle down onto the event bus.
const telemetryRails = [
  "M325 270 V76",
  "M520 236 V76",
  "M860 150 V76",
  "M1080 222 V76",
  "M1200 280 V76",
] as const;
const stateRails = ["M325 350 V584", "M820 470 V584"] as const;

const cores = [
  { label: "Policy", cy: 268 },
  { label: "Ground", cy: 310 },
  { label: "Schema", cy: 352 },
] as const;

const orchStages = [
  { id: "plan", label: "Plan", x: 474 },
  { id: "act", label: "Act", x: 534 },
  { id: "check", label: "Check", x: 594 },
] as const;

type Stage = (typeof orchStages)[number]["id"];

type LogLine = { id: string; time: string; stage: string; text: string };

const layers = [
  {
    title: "Edge",
    body: "Webhooks and APIs end at an authenticated gateway. Tenancy is resolved before a model sees a single token.",
  },
  {
    title: "Orchestrator",
    body: "An agent runtime plans, calls tools and drafts an answer inside explicit step and cost budgets.",
  },
  {
    title: "Capabilities",
    body: "Typed Python tools with Pydantic contracts, retrieval with reranking, and a model layer with provider fallback.",
  },
  {
    title: "Gate",
    body: "Policy, grounding and schema checks vote independently. A draft ships only on three of three.",
  },
  {
    title: "State and telemetry",
    body: "Sessions and events persist to MongoDB and queues, and every hop emits traces and eval signals.",
  },
] as const;

const staticTrace: readonly LogLine[] = [
  { id: "s0", time: "+0.000", stage: "Ingress", text: "whatsapp.webhook" },
  { id: "s1", time: "+0.011", stage: "Edge", text: "auth ok · tenant mx" },
  { id: "s2", time: "+0.019", stage: "Plan", text: "retrieve → tool → draft" },
  { id: "s3", time: "+0.161", stage: "Retrieve", text: "top_k 8 · rerank 3 · 142ms" },
  { id: "s4", time: "+0.249", stage: "Tool", text: "get_account_summary ✓ 88ms" },
  { id: "s5", time: "+1.370", stage: "Model", text: "draft · 612 tokens" },
  { id: "s6", time: "+1.402", stage: "Gate", text: "policy ✓ ground ✓ schema ✓" },
  { id: "s7", time: "+1.840", stage: "Reply", text: "200 · 3 of 3 approved" },
];

const channels = [
  { node: "c1", text: "whatsapp.webhook" },
  { node: "c2", text: "POST /v1/chat" },
  { node: "c3", text: "rpc agent.invoke" },
] as const;

const toolNames = ["get_account_summary", "list_transactions", "open_support_case"] as const;

/** Deterministic noise so each loop reads like a different real trace. */
function noise(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function between(seed: number, min: number, max: number) {
  return Math.round(min + noise(seed) * (max - min));
}

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (60 * i - 90);
    return `${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`;
  }).join(" ");
}

export function Architecture() {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { amount: 0.25 });
  const pathRefs = useRef<Partial<Record<EdgeId, SVGPathElement | null>>>({});
  const packetRef = useRef<SVGRectElement>(null);

  const [activeNodes, setActiveNodes] = useState<readonly NodeId[]>([]);
  const [activeEdge, setActiveEdge] = useState<EdgeId | null>(null);
  const [stage, setStage] = useState<Stage | null>(null);
  const [votes, setVotes] = useState(3);
  const [trace, setTrace] = useState("7f3a9c");
  const [logs, setLogs] = useState<readonly LogLine[]>(staticTrace);

  useEffect(() => {
    if (reduce || !inView) return;

    let cancelled = false;
    let current: AnimationPlaybackControls | null = null;
    const timers: number[] = [];
    const packet = packetRef.current;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms));
      });

    const travel = (edge: EdgeId, reverse = false, duration = 0.62) =>
      new Promise<void>((resolve) => {
        const path = pathRefs.current[edge];
        if (!path || !packet) return resolve();
        const length = path.getTotalLength();
        setActiveEdge(edge);
        packet.style.opacity = "1";
        current = animate(0, 1, {
          duration,
          ease: [0.65, 0, 0.35, 1],
          onUpdate: (t) => {
            const point = path.getPointAtLength(length * (reverse ? 1 - t : t));
            packet.setAttribute("x", (point.x - 4).toFixed(2));
            packet.setAttribute("y", (point.y - 4).toFixed(2));
          },
          onComplete: () => {
            packet.style.opacity = "0";
            resolve();
          },
        });
      });

    const run = async () => {
      let loop = 0;
      while (!cancelled) {
        loop += 1;
        const channel = channels[loop % channels.length];
        const tool = toolNames[loop % toolNames.length];
        const authMs = between(loop * 3, 8, 16);
        const retrieveMs = between(loop * 5, 112, 188);
        const toolMs = between(loop * 7, 61, 118);
        const tokens = between(loop * 11, 470, 760);
        const modelMs = between(loop * 13, 880, 1360);
        let elapsed = 0;
        const lines: LogLine[] = [];
        const log = (ms: number, stageLabel: string, text: string) => {
          elapsed += ms;
          lines.push({
            id: `${loop}-${lines.length}`,
            time: `+${(elapsed / 1000).toFixed(3)}`,
            stage: stageLabel,
            text,
          });
          if (!cancelled) setLogs([...lines]);
        };

        setTrace(Math.floor(noise(loop * 17) * 0xffffff).toString(16).padStart(6, "0"));
        setVotes(0);
        setStage(null);

        setActiveNodes([channel.node]);
        log(0, "Ingress", channel.text);
        await travel(channel.node);
        if (cancelled) return;

        setActiveNodes(["edge"]);
        log(authMs, "Edge", `auth ok · tenant mx · ${authMs}ms`);
        await wait(260);
        await travel("edgeOrch", false, 0.4);
        if (cancelled) return;

        setActiveNodes(["orch"]);
        setStage("plan");
        log(8, "Plan", "retrieve → tool → draft");
        await wait(520);
        if (cancelled) return;

        setStage("act");
        setActiveNodes(["orch", "retrieval"]);
        await travel("orchRetrieval", false, 0.38);
        log(retrieveMs, "Retrieve", `top_k 8 · rerank 3 · ${retrieveMs}ms`);
        await travel("orchRetrieval", true, 0.38);
        if (cancelled) return;

        setActiveNodes(["orch", "tools"]);
        await travel("orchTools", false, 0.46);
        log(toolMs, "Tool", `${tool} ✓ ${toolMs}ms`);
        await travel("orchTools", true, 0.46);
        if (cancelled) return;

        setActiveNodes(["orch", "models"]);
        await travel("orchModels", false, 0.46);
        log(modelMs, "Model", `draft · ${tokens} tokens`);
        await travel("orchModels", true, 0.46);
        if (cancelled) return;

        setStage("check");
        setActiveNodes(["orch", "gate"]);
        await travel("orchGate", false, 0.9);
        if (cancelled) return;

        setActiveNodes(["gate"]);
        for (let index = 0; index < cores.length; index += 1) {
          await wait(300);
          if (cancelled) return;
          setVotes(index + 1);
        }
        log(between(loop * 19, 22, 41), "Gate", "policy ✓ ground ✓ schema ✓");
        await wait(240);

        setActiveNodes(["reply"]);
        await travel("gateReply", false, 0.36);
        log(between(loop * 23, 380, 460), "Reply", "200 · 3 of 3 approved");
        if (cancelled) return;

        setActiveNodes(["orch"]);
        setStage(null);
        await travel("orchState", false, 0.5);
        log(6, "Persist", "session saved · event emitted");
        setActiveEdge(null);
        setActiveNodes([]);
        await wait(1500);
      }
    };

    void run();

    return () => {
      cancelled = true;
      current?.stop();
      timers.forEach((id) => window.clearTimeout(id));
      if (packet) packet.style.opacity = "0";
    };
  }, [inView, reduce]);

  const isActive = (id: NodeId) => activeNodes.includes(id);

  return (
    <section
      id="architecture"
      aria-labelledby="architecture-title"
      tabIndex={-1}
      className="relative overflow-hidden border-b border-edge focus:outline-none"
    >
      <div
        aria-hidden
        className="hex-field pointer-events-none absolute inset-0 text-hex-line opacity-80 [--hex-fade:linear-gradient(180deg,transparent,black_18%,black_82%,transparent)]"
      />
      <div className="relative mx-auto max-w-[1380px] px-5 py-28 sm:px-8 lg:px-10 lg:py-40">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <TitleCard
            className="lg:col-span-8"
            id="architecture-title"
            index="03"
            label="Architecture"
            meta="Reference system"
            lines={[
              { text: "Anatomy" },
              { text: "of a production", scale: 0.42, tone: "muted", light: true },
              { text: "agent" },
            ]}
          />
          <Reveal className="lg:col-span-4" delay={0.1}>
            <p className="max-w-[46ch] leading-relaxed text-pretty text-muted">
              The architecture I build toward. Requests enter through an
              authenticated edge, an orchestrator works through typed tools,
              grounded retrieval and model calls, and nothing reaches a user
              until three independent checks agree.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14 lg:mt-20">
          <figure>
            <div ref={stageRef} className="relative border border-edge bg-background/70 p-2 backdrop-blur-[2px] sm:p-4">
              <Brackets className="border-foreground/70" size="size-4" />
              <div className="hud flex items-center justify-between px-2 pt-1 pb-3 text-muted sm:px-3">
                <span>
                  Fig. 02 · <span className="text-foreground">Request lifecycle</span>
                </span>
                <span className="flex items-center gap-2">
                  <span aria-hidden className="blink size-1.5 bg-accent" />
                  <span className="motion-reduce:hidden">Live simulation</span>
                  <span className="hidden motion-reduce:inline">Static view</span>
                </span>
              </div>
              <div className="overflow-x-auto">
                <svg
                  viewBox="0 0 1280 660"
                  role="img"
                  aria-labelledby="arch-svg-title arch-svg-desc"
                  className="h-auto w-full min-w-[920px] font-mono"
                >
                  <title id="arch-svg-title">Production AI agent architecture</title>
                  <desc id="arch-svg-desc">
                    Requests from WhatsApp, a web app and internal services pass
                    through an authenticated edge to an orchestrator. The
                    orchestrator calls typed tools, retrieval and models, then
                    sends its draft to a gate where policy, grounding and schema
                    checks must all approve before the reply is sent. Every step
                    reports to an observability bus, and state is written to an
                    event bus.
                  </desc>

                  {/* Buses */}
                  <Bus y={40} label="Observability" sub="traces · evals · error tracking" />
                  <Bus y={584} label="State & events" sub="MongoDB sessions · SQS · EventBridge · Step Functions" />

                  {/* Rails */}
                  {telemetryRails.map((d) => (
                    <path key={d} d={d} className="flow-dash fill-none stroke-edge-strong" strokeWidth={1} />
                  ))}
                  {stateRails.map((d) => (
                    <path key={d} d={d} className="flow-dash fill-none stroke-edge-strong" strokeWidth={1} />
                  ))}

                  {(Object.keys(edges) as EdgeId[]).map((id) => (
                    <path
                      key={id}
                      ref={(element) => {
                        pathRefs.current[id] = element;
                      }}
                      d={edges[id]}
                      className={`fill-none transition-[stroke,stroke-width] duration-300 ${
                        activeEdge === id ? "stroke-accent" : "stroke-edge-strong"
                      }`}
                      strokeWidth={activeEdge === id ? 2 : 1.25}
                      strokeLinejoin="round"
                    />
                  ))}

                  {/* Nodes */}
                  {nodes.map((node) => (
                    <DiagramBox key={node.id} node={node} active={isActive(node.id)} />
                  ))}

                  {/* Orchestrator inner loop */}
                  {orchStages.map((item) => {
                    const on = stage === item.id;
                    return (
                      <g key={item.id}>
                        <rect
                          x={item.x}
                          y={300}
                          width={52}
                          height={26}
                          className={`transition-[fill,stroke] duration-300 ${
                            on ? "fill-accent stroke-accent" : "fill-background stroke-edge-strong"
                          }`}
                        />
                        <text
                          x={item.x + 26}
                          y={317}
                          textAnchor="middle"
                          fontSize={9.5}
                          letterSpacing="0.12em"
                          className={on ? "fill-white" : "fill-muted"}
                        >
                          {item.label.toUpperCase()}
                        </text>
                      </g>
                    );
                  })}
                  <text x={474} y={360} fontSize={10} letterSpacing="0.1em" className="fill-muted">
                    ≤ 6 STEPS · BUDGETED
                  </text>

                  {/* Validation cores */}
                  {cores.map((core, index) => {
                    const approved = votes > index;
                    return (
                      <g key={core.label}>
                        <polygon
                          points={hexPoints(1008, core.cy, 14)}
                          className={`transition-[fill,stroke] duration-300 ${
                            approved ? "fill-accent stroke-accent" : "fill-background stroke-edge-strong"
                          }`}
                        />
                        <text
                          x={1030}
                          y={core.cy + 3.5}
                          fontSize={9.5}
                          letterSpacing="0.1em"
                          className={approved ? "fill-foreground" : "fill-muted"}
                        >
                          {core.label.toUpperCase()}
                        </text>
                      </g>
                    );
                  })}

                  {/* Request packet, shaped like the logo's square */}
                  <rect
                    ref={packetRef}
                    x={-20}
                    y={-20}
                    width={8}
                    height={8}
                    className="fill-accent"
                    style={{ opacity: 0, filter: "drop-shadow(0 0 6px rgb(14 93 252 / 0.95))" }}
                  />
                </svg>
              </div>
              <p className="hud px-2 pt-3 text-muted sm:hidden">Swipe to explore →</p>
            </div>

            <figcaption className="hud mt-4 flex flex-wrap gap-x-7 gap-y-2 text-muted">
              <span className="flex items-center gap-2">
                <span aria-hidden className="size-2 bg-accent" /> Request
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden className="h-0.5 w-5 bg-accent" /> Active path
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden className="h-px w-5 border-t border-dashed border-edge-strong" /> Telemetry and state
              </span>
              <span className="flex items-center gap-2">
                <svg aria-hidden viewBox="0 0 20 20" className="size-3.5">
                  <polygon points={hexPoints(10, 10, 8)} className="fill-none stroke-foreground" />
                </svg>
                Validation core
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <ol className="lg:col-span-7">
            {layers.map((layer, index) => (
              <Reveal key={layer.title} delay={index * 0.05}>
                <li className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-t border-edge py-5 sm:grid-cols-[3rem_12rem_minmax(0,1fr)]">
                  <span className="hud pt-1 text-accent-text">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="text-lg font-medium tracking-[-0.02em]">{layer.title}</h3>
                  <p className="col-start-2 text-sm leading-relaxed text-pretty text-muted sm:col-start-auto">
                    {layer.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal className="lg:col-span-5" delay={0.08}>
            <div aria-hidden="true" className="relative border border-edge-strong bg-surface">
              <div className="hud flex items-center justify-between border-b border-edge px-4 py-3 text-muted">
                <span>
                  Trace <span className="text-foreground">{trace}</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="blink size-1.5 bg-accent" />
                  stdout
                </span>
              </div>
              <ul className="min-h-[19.5rem] px-4 py-3 font-mono text-[0.72rem] leading-6">
                {logs.map((line, index) => {
                  const latest = index === logs.length - 1;
                  return (
                    <li
                      key={line.id}
                      className={`grid grid-cols-[4.2rem_4.6rem_minmax(0,1fr)] gap-2 ${
                        latest ? "text-foreground" : "text-muted"
                      }`}
                    >
                      <span className="tabular-nums">{line.time}</span>
                      <span className={latest ? "text-accent-text" : ""}>{line.stage.toUpperCase()}</span>
                      <span className="truncate">{line.text}</span>
                    </li>
                  );
                })}
                <li className="mt-1 text-accent-text motion-reduce:hidden">
                  <span className="blink">▌</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Bus({ y, label, sub }: { y: number; label: string; sub: string }) {
  return (
    <g>
      <rect x={40} y={y} width={1210} height={36} className="fill-surface stroke-edge-strong" />
      <text x={56} y={y + 22} fontSize={10.5} letterSpacing="0.14em" className="fill-foreground">
        {label.toUpperCase()}
      </text>
      <text x={250} y={y + 22} fontSize={10.5} letterSpacing="0.06em" className="fill-muted">
        {sub}
      </text>
      {Array.from({ length: 24 }, (_, i) => (
        <rect key={i} x={1060 + i * 7.5} y={y + 14} width={3} height={8} className="fill-edge-strong" />
      ))}
    </g>
  );
}

function DiagramBox({ node, active }: { node: DiagramNode; active: boolean }) {
  const tick = 7;
  return (
    <g>
      <rect
        x={node.x}
        y={node.y}
        width={node.w}
        height={node.h}
        className={`transition-[fill,stroke] duration-300 ${
          active ? "fill-accent/12 stroke-accent" : "fill-surface stroke-edge-strong"
        }`}
        strokeWidth={active ? 1.5 : 1}
      />
      {/* Corner ticks read as a reticle when the node is live. */}
      {active && (
        <g className="stroke-accent" strokeWidth={2} fill="none">
          <path d={`M${node.x - 4} ${node.y - 4 + tick} V${node.y - 4} H${node.x - 4 + tick}`} />
          <path d={`M${node.x + node.w + 4 - tick} ${node.y - 4} H${node.x + node.w + 4} V${node.y - 4 + tick}`} />
          <path d={`M${node.x - 4} ${node.y + node.h + 4 - tick} V${node.y + node.h + 4} H${node.x - 4 + tick}`} />
          <path
            d={`M${node.x + node.w + 4 - tick} ${node.y + node.h + 4} H${node.x + node.w + 4} V${node.y + node.h + 4 - tick}`}
          />
        </g>
      )}
      <text
        x={node.x + 14}
        y={node.y + 24}
        fontSize={11.5}
        letterSpacing="0.14em"
        className={active ? "fill-accent-text" : "fill-foreground"}
      >
        {node.label.toUpperCase()}
      </text>
      <text
        x={node.x + 14}
        y={node.subAtBottom ? node.y + node.h - 12 : node.y + 42}
        fontSize={10.5}
        className="fill-muted"
      >
        {node.sub}
      </text>
    </g>
  );
}
