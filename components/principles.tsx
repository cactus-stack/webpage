import { Reveal } from "@/components/reveal";
import { TitleCard } from "@/components/title-card";

const principles = [
  {
    title: "Contracts before cleverness",
    body: "Typed boundaries keep business rules, agent tools and infrastructure understandable as the system grows.",
    tag: "Pydantic · typed Python",
  },
  {
    title: "Agents use explicit tools",
    body: "Models can reason, but production services still own policy, validation, authentication and data access.",
    tag: "Tool contracts · auth",
  },
  {
    title: "Operability is part of design",
    body: "Clear failure paths, observable workflows and testable components matter before a feature reaches production.",
    tag: "Traces · evals · tests",
  },
] as const;

export function Principles() {
  return (
    <section
      aria-labelledby="protocols-title"
      className="mx-auto max-w-[1380px] px-5 py-28 sm:px-8 lg:px-10 lg:py-40"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <TitleCard
          className="lg:col-span-8"
          id="protocols-title"
          index="05"
          label="Protocols"
          meta="Operating rules"
          lines={[
            { text: "Engineering" },
            { text: "that holds under", scale: 0.42, tone: "muted", light: true },
            { text: "pressure" },
          ]}
        />
        <Reveal className="lg:col-span-4" delay={0.1}>
          <p className="max-w-[46ch] leading-relaxed text-pretty text-muted">
            I keep AI systems grounded in explicit interfaces, controlled access
            and workflows that teams can operate.
          </p>
        </Reveal>
      </div>

      <ol className="mt-16 border-b border-edge lg:mt-20">
        {principles.map((principle, index) => (
          <Reveal key={principle.title} delay={index * 0.06}>
            <li className="group grid gap-4 border-t border-edge py-8 transition-colors duration-300 hover:bg-surface sm:grid-cols-[8rem_minmax(0,1fr)] lg:grid-cols-[10rem_minmax(0,1.1fr)_minmax(0,1fr)_12rem] lg:items-baseline lg:gap-10 lg:py-10">
              <span className="title-card text-6xl text-edge-strong transition-colors duration-300 group-hover:text-accent lg:pl-4 lg:text-7xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-2xl font-medium tracking-[-0.035em] text-balance sm:text-3xl">
                {principle.title}
              </h3>
              <p className="max-w-[48ch] text-sm leading-relaxed text-pretty text-muted sm:col-start-2 sm:text-base lg:col-start-auto">
                {principle.body}
              </p>
              <p className="hud text-muted sm:col-start-2 lg:col-start-auto lg:pr-4 lg:text-right">
                {principle.tag}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
