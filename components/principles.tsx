import Image from "next/image";
import { Reveal } from "@/components/reveal";

const principles = [
  {
    title: "Contracts before cleverness",
    body: "Typed boundaries keep business rules, agent tools and infrastructure understandable as the system grows.",
  },
  {
    title: "Agents use explicit tools",
    body: "Models can reason, but production services still own policy, validation, authentication and data access.",
  },
  {
    title: "Operability is part of design",
    body: "Clear failure paths, observable workflows and testable components matter before a feature reaches production.",
  },
];

export function Principles() {
  return (
    <section className="mx-auto max-w-[1380px] px-5 py-28 sm:px-8 lg:px-10 lg:py-44">
      <Reveal>
        <h2 className="max-w-[13ch] text-4xl leading-[0.96] font-medium tracking-[-0.052em] text-balance sm:text-5xl lg:text-6xl">
          Engineering that stays understandable under pressure.
        </h2>
        <p className="mt-6 max-w-[55ch] text-base leading-relaxed text-pretty text-muted sm:text-lg">
          I keep AI systems grounded in explicit interfaces, controlled access and
          workflows that teams can operate.
        </p>
      </Reveal>

      <div className="mt-16 grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-7">
          <figure className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-edge bg-surface shadow-[0_24px_80px_rgb(27_48_82_/_0.1)]">
            <Image
              src="/images/system-topology.webp"
              alt="Architectural layers connected by controlled blue signal paths"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.025]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-white/15 ring-inset"
            />
          </figure>
        </Reveal>

        <div className="lg:col-span-5 lg:pt-10">
          {principles.map((principle, index) => (
            <Reveal
              key={principle.title}
              delay={index * 0.07}
              className="border-t border-edge py-7 first:pt-0 first:border-t-0 lg:first:border-t lg:first:pt-7"
            >
              <article>
                <h3 className="text-xl font-medium tracking-[-0.035em] sm:text-2xl">
                  {principle.title}
                </h3>
                <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-pretty text-muted sm:text-base">
                  {principle.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
