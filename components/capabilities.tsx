import Image from "next/image";
import type { ReactNode } from "react";
import {
  CloudArrowUp,
  FlowArrow,
  PlugsConnected,
  Robot,
  Stack as StackIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { Spotlight } from "@/components/spotlight";

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";

/** Double-bezel bento cell: outer tray + inner core with its own surface */
function Cell({
  children,
  inner = "bg-background",
}: {
  children: ReactNode;
  inner?: string;
}) {
  return (
    <Spotlight
      className={`h-full rounded-[1.75rem] bg-foreground/[0.04] p-1.5 ring-1 ring-foreground/10 transition-all duration-500 ${EASE} hover:-translate-y-1 hover:ring-accent/40 hover:shadow-[0_24px_60px_-28px_color-mix(in_srgb,var(--accent)_45%,transparent)]`}
    >
      <div
        className={`h-full overflow-hidden rounded-[calc(1.75rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] ${inner}`}
      >
        {children}
      </div>
    </Spotlight>
  );
}

export function Capabilities() {
  return (
    <section id="capabilities" className="border-y border-edge bg-surface">
      <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
        <Reveal>
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">What I do</h2>
          <p className="mt-4 max-w-[65ch] leading-relaxed text-pretty text-muted">
            Five areas, one goal: software that ships and holds up in
            production.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-6">
          <Reveal className="md:col-span-4">
            <Cell inner="bg-gradient-to-br from-accent/15 via-background to-background">
              <div className="p-7">
                <StackIcon size={28} className="text-accent" />
                <h3 className="mt-5 text-xl font-medium tracking-tight">
                  Backend platforms
                </h3>
                <p className="mt-3 max-w-[48ch] leading-relaxed text-muted">
                  Python services with typed data models, parsers, and DTOs.
                  Clean separation between adapters, orchestration logic, and
                  backend clients.
                </p>
              </div>
            </Cell>
          </Reveal>
          <Reveal className="md:col-span-2" delay={0.05}>
            <Cell>
              <div className="p-7">
                <CloudArrowUp size={28} className="text-accent" />
                <h3 className="mt-5 text-xl font-medium tracking-tight">
                  AWS serverless
                </h3>
                <p className="mt-3 leading-relaxed text-muted">
                  Lambda, Step Functions, SQS, EventBridge, S3. Event-driven
                  workflows that scale on their own.
                </p>
              </div>
            </Cell>
          </Reveal>
          <Reveal className="md:col-span-3" delay={0.1}>
            <Cell>
              <div className="relative h-full min-h-64">
                <Image
                  src="/images/fog-harbor.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/65 to-zinc-950/45" />
                <div className="relative flex h-full flex-col justify-end p-7">
                  <Robot size={28} className="text-blue-400" />
                  <h3 className="mt-5 text-xl font-medium tracking-tight text-zinc-50">
                    LLM agents &amp; RAG
                  </h3>
                  <p className="mt-3 leading-relaxed text-zinc-300">
                    Agent tools, retrieval pipelines, and validation flows with
                    the OpenAI Agents SDK, Bedrock, and LangChain.
                  </p>
                </div>
              </div>
            </Cell>
          </Reveal>
          <Reveal className="md:col-span-3" delay={0.15}>
            <Cell>
              <div className="p-7">
                <PlugsConnected size={28} className="text-accent" />
                <h3 className="mt-5 text-xl font-medium tracking-tight">
                  API integrations
                </h3>
                <p className="mt-3 leading-relaxed text-muted">
                  REST APIs, auth flows, and webhooks that keep AI capabilities
                  decoupled from underlying service contracts.
                </p>
              </div>
            </Cell>
          </Reveal>
          <Reveal className="md:col-span-6" delay={0.2}>
            <Cell>
              <div className="flex h-full flex-col gap-4 p-7 sm:flex-row sm:items-center sm:gap-8">
                <FlowArrow size={28} className="shrink-0 text-accent" />
                <div>
                  <h3 className="text-xl font-medium tracking-tight">
                    Data &amp; automation
                  </h3>
                  <p className="mt-3 max-w-[72ch] leading-relaxed text-muted">
                    Real-time data pipelines, automated testing, and process
                    automation, from UiPath bots to serverless event streams.
                  </p>
                </div>
              </div>
            </Cell>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
