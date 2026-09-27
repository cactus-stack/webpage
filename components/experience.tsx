import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { TitleCard } from "@/components/title-card";
import { site } from "@/lib/site";

const roles = [
  {
    company: "Plexus Tech, client BBVA",
    role: "Full-Stack AI Engineer",
    focus: "Global banking agent tools",
    period: "Feb 2026 – Sep 2026",
    location: "Mexico City",
  },
  {
    company: "Siatech",
    role: "Software Engineer, Backend, AI & Cloud",
    focus: "Serverless platform and LLM agent",
    period: "Jan 2025 – Dec 2025",
    location: "Remote",
  },
  {
    company: "FIXAT",
    role: "Software Engineer",
    focus: "Production RAG agent",
    period: "Jul 2023 – Dec 2024",
    location: "Remote",
  },
  {
    company: "BASF Mexicana",
    role: "Python Automation / Digitalization Intern",
    focus: "Workflow automation and reporting",
    period: "Jan 2022 – Jun 2023",
    location: "Mexico City",
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
      <div className="mx-auto max-w-[1380px] px-5 py-28 sm:px-8 lg:px-10 lg:py-40">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <TitleCard
            className="lg:col-span-8"
            id="about-title"
            lines={[
              { text: "From automation" },
              { text: "to", scale: 0.42, tone: "muted", light: true },
              { text: "production AI" },
            ]}
          />
          <div className="lg:col-span-4">
            <p className="max-w-[40ch] leading-relaxed text-pretty text-muted">
              Each role moved closer to owning the services behind intelligent
              products.
            </p>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hud mt-6 inline-flex min-h-11 items-center gap-2 text-accent-text transition-colors duration-300 hover:text-foreground"
            >
              Full history
              <span className="sr-only"> on LinkedIn, opens in a new tab</span>
              <ArrowUpRight size={15} aria-hidden />
            </a>
          </div>
        </div>

        <ol className="mt-16 border-b border-edge lg:mt-20">
          {roles.map((role, index) => (
              <li
                key={`${role.company}-${role.period}`}
                className="group grid gap-3 border-t border-edge py-7 transition-colors duration-300 hover:bg-background/60 sm:grid-cols-[12rem_minmax(0,1fr)] lg:grid-cols-[14rem_minmax(0,1.2fr)_minmax(0,1fr)_6rem] lg:items-baseline lg:gap-10 lg:py-9">
                <p className="hud text-muted lg:pl-4">{role.period}</p>
                <div>
                  <p className="hud text-accent-text">{role.company}</p>
                  <h3 className="mt-3 text-2xl font-medium tracking-[-0.035em] transition-colors duration-300 group-hover:text-accent-text sm:text-3xl">
                    {role.focus}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-muted sm:col-start-2 lg:col-start-auto">
                  {role.role}
                  <br />
                  {role.location}
                </p>
                <p aria-hidden="true" className="hud hidden text-right text-edge-strong lg:block lg:pr-4">
                  R-{String(roles.length - index).padStart(2, "0")}
                </p>
              </li>
          ))}
        </ol>

        <div className="mt-8">
          <p className="hud text-muted">
            B.S. Computer Systems Engineering · Instituto Politécnico Nacional (ESCOM) · 2025
          </p>
        </div>
      </div>
    </section>
  );
}
