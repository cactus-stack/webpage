import { Reveal } from "@/components/reveal";

const facts = [
  {
    label: "Latest role",
    value: "Agent tools for BBVA",
    detail: "Full-Stack AI Engineer at Plexus Tech, on Agent Blue's global core team.",
  },
  {
    label: "Production scale",
    value: "60M+ API requests a year",
    detail: "Serverless AWS platform for 12,000+ users, under 0.3% Lambda errors.",
  },
  {
    label: "Work status",
    value: "U.S. citizen",
    detail: "Based in Mexico City. No sponsorship required.",
  },
];

export function Facts() {
  return (
    <section aria-label="Professional profile" className="bg-surface">
      <dl className="mx-auto grid max-w-[1380px] px-5 sm:px-8 lg:grid-cols-12 lg:px-10">
        {facts.map((fact, index) => (
          <Reveal
            key={fact.label}
            delay={index * 0.07}
            className={`border-b border-edge py-8 last:border-b-0 lg:border-b-0 lg:border-l lg:px-8 lg:py-10 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0 ${
              index === 0 ? "lg:col-span-5" : index === 1 ? "lg:col-span-4" : "lg:col-span-3"
            }`}
          >
            <dt className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
              {fact.label}
            </dt>
            <dd className="mt-4">
              <span className="block text-xl font-medium tracking-[-0.035em] sm:text-2xl">
                {fact.value}
              </span>
              <span className="mt-2 block max-w-[38ch] text-sm leading-relaxed text-muted">
                {fact.detail}
              </span>
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
