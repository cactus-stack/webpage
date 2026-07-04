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
    <section className="border-y border-edge bg-surface">
      <dl className="mx-auto grid max-w-[1200px] divide-y divide-edge px-6 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {facts.map((fact, i) => (
          <Reveal
            key={fact.label}
            delay={i * 0.08}
            className="py-8 lg:px-8 lg:first:pl-0 lg:last:pr-0"
          >
            <dt className="text-sm text-muted">{fact.label}</dt>
            <dd className="mt-2 leading-relaxed">{fact.value}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
