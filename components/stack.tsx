import { BrandMark, stackLogos } from "@/components/logos";
import { Reveal } from "@/components/reveal";

const groups = [
  { label: "Languages", names: ["Python", "Go", "JavaScript"] },
  { label: "Cloud and data", names: ["AWS", "MongoDB", "pandas"] },
  { label: "AI and backend", names: ["LangChain", "Pydantic"] },
  { label: "Delivery", names: ["Postman", "GitHub"] },
];

const logoByName = new Map(stackLogos.map((logo) => [logo.name, logo]));

export function Stack() {
  return (
    <section className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
      <Reveal>
        <h2 className="text-3xl font-medium tracking-[-0.04em] md:text-4xl">
          Core tooling.
        </h2>
        <p className="mt-5 max-w-[46ch] leading-relaxed text-pretty text-muted">
          Tools chosen for clear contracts, operable systems and fast feedback.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((group, index) => (
          <Reveal key={group.label} delay={index * 0.055}>
            <section aria-labelledby={`stack-${index}`} className="border-t border-edge pt-5">
              <h3
                id={`stack-${index}`}
                className="font-mono text-xs tracking-[0.08em] text-muted uppercase"
              >
                {group.label}
              </h3>
              <ul className="mt-6 space-y-5">
                {group.names.map((name) => {
                  const logo = logoByName.get(name);
                  if (!logo) return null;
                  return (
                    <li key={name} className="flex min-h-10 items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center text-foreground">
                        <BrandMark logo={logo} />
                      </span>
                      <span className="text-sm text-muted">{name}</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
