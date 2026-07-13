import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

const roles = [
  {
    company: "Plexus Tech",
    role: "Software Engineer, BBVA project",
    focus: "Conversational banking integration",
    period: "2026 - Present",
    location: "Mexico City",
  },
  {
    company: "FIXAT",
    role: "Software Engineer",
    focus: "Serverless financial RAG",
    period: "2024 - 2025",
    location: "Remote",
  },
  {
    company: "Hitss México",
    role: "Backend / QA Intern",
    focus: "API quality for Claro Drive",
    period: "2023 - 2024",
    location: "Remote",
  },
  {
    company: "BASF",
    role: "Python Automation / Digitalization Intern",
    focus: "Process automation and analysis",
    period: "2022 - 2023",
    location: "Mexico",
  },
];

export function Experience() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      tabIndex={-1}
      className="border-y border-edge bg-surface focus:outline-none"
    >
      <div className="mx-auto grid max-w-[1380px] gap-14 px-5 py-28 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-40">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <Reveal>
            <h2
              id="about-title"
              className="max-w-[10ch] text-4xl leading-[0.96] font-medium tracking-[-0.052em] text-balance sm:text-5xl"
            >
              From automation to production AI.
            </h2>
            <p className="mt-6 max-w-[38ch] leading-relaxed text-pretty text-muted">
              Each role moved closer to owning the services behind intelligent
              products.
            </p>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent transition-colors duration-300 hover:text-foreground"
            >
              Full history
              <span className="sr-only"> on LinkedIn, opens in a new tab</span>
              <ArrowUpRight size={16} aria-hidden />
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          {roles.map((role, index) => (
            <Reveal
              key={`${role.company}-${role.period}`}
              delay={index * 0.055}
              className="border-t border-edge py-8 first:pt-8 last:pb-0"
            >
              <article className="group grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-8">
                <div>
                  <p className="text-sm font-medium text-accent">{role.company}</p>
                  <h3 className="mt-3 text-2xl font-medium tracking-[-0.035em] transition-colors duration-300 group-hover:text-accent sm:text-3xl">
                    {role.focus}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {role.role}, {role.location}
                  </p>
                </div>
                <p className="font-mono text-xs tracking-[0.05em] text-muted tabular-nums sm:pt-1">
                  {role.period}
                </p>
              </article>
            </Reveal>
          ))}

          <Reveal className="mt-12 border-t border-edge pt-7">
            <p className="text-sm leading-relaxed text-muted">
              B.Eng. in Systems Engineering, Instituto Politécnico Nacional.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
