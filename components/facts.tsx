import { Reveal } from "@/components/reveal";

const facts = [
  {
    label: "Now",
    value:
      "Software Engineer at Plexus Tech, building conversational AI for BBVA.",
  },
  {
    label: "Work authorization",
    value: "U.S. citizen based in Mexico City, no visa sponsorship required.",
  },
  {
    label: "Education",
    value:
      "B.Eng. in Systems Engineering, Instituto Politécnico Nacional (IPN).",
  },
];

export function Facts() {
  return (
    <section aria-label="Profile summary" className="bg-surface">
      <dl className="mx-auto grid max-w-[1320px] px-5 sm:px-8 lg:grid-cols-12 lg:px-10">
        {facts.map((fact, i) => (
          <Reveal
            key={fact.label}
            delay={i * 0.08}
            className={`border-b border-edge py-7 last:border-b-0 lg:border-b-0 lg:border-l lg:px-7 lg:py-9 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0 ${
              i === 0 ? "lg:col-span-6" : "lg:col-span-3"
            }`}
          >
            <dt className="font-mono text-xs tracking-[0.08em] text-muted uppercase">
              {fact.label}
            </dt>
            <dd
              className={`mt-3 leading-relaxed text-pretty ${
                i === 0 ? "max-w-[46ch] text-lg" : "text-sm"
              }`}
            >
              {fact.value}
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
