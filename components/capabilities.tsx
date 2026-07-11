import Image from "next/image";
import {
  CloudArrowUp,
  FlowArrow,
  Robot,
  Stack as StackIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";

const capabilities = [
  {
    title: "Backend platforms",
    description:
      "Typed Python services, adapters and APIs with clear contracts between business logic and infrastructure.",
    Icon: StackIcon,
  },
  {
    title: "Agent systems",
    description:
      "Tools, retrieval and validation flows that let agents act through production services safely.",
    Icon: Robot,
  },
  {
    title: "Cloud workflows",
    description:
      "Lambda, Step Functions, SQS and EventBridge for event-driven systems that stay operable as they scale.",
    Icon: CloudArrowUp,
  },
  {
    title: "Data and automation",
    description:
      "Pipelines, automated tests and process automation that turn repetitive work into dependable workflows.",
    Icon: FlowArrow,
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="border-y border-edge bg-surface">
      <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
        <Reveal>
          <h2 className="max-w-[12ch] text-4xl leading-[0.98] font-medium tracking-[-0.045em] text-balance md:text-5xl">
            Systems I can own.
          </h2>
          <p className="mt-6 max-w-[52ch] leading-relaxed text-pretty text-muted">
            Backend services, agent integrations, cloud workflows and
            automation built around explicit interfaces and operability.
          </p>
        </Reveal>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <figure>
              <div className="relative aspect-3/2 overflow-hidden rounded-2xl border border-edge bg-surface-strong">
                <Image
                  src="/images/system-topology.webp"
                  alt="Abstract structure of glass, graphite and blue signal paths representing a distributed software system"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 ring-1 ring-white/10 ring-inset"
                />
              </div>
            </figure>
          </Reveal>

          <div className="lg:col-span-5">
            {capabilities.map(({ title, description, Icon }, index) => (
              <Reveal
                key={title}
                delay={index * 0.055}
                className="border-t border-edge py-6 first:pt-0 first:border-t-0 lg:first:border-t lg:first:pt-6"
              >
                <article className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-background text-accent ring-1 ring-edge">
                    <Icon size={20} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg font-medium tracking-[-0.025em]">
                      {title}
                    </h3>
                    <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-pretty text-muted">
                      {description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
