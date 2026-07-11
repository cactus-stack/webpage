import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";

type Job = {
  company: string;
  focus: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  stack: string[];
};

const jobs: Job[] = [
  {
    company: "Plexus Tech",
    focus: "Conversational banking integration",
    role: "Software Engineer, BBVA project",
    period: "2026 - Present",
    location: "Mexico City",
    summary:
      "Building typed Python tools, orchestration and enterprise authentication that connect AI agents to banking services, validated end to end in real environments.",
    stack: ["Python", "OpenAI Agents SDK", "Pydantic", "AWS"],
  },
  {
    company: "FIXAT",
    focus: "Serverless financial RAG",
    role: "Software Engineer",
    period: "2024 - 2025",
    location: "Remote",
    summary:
      "Built a serverless RAG chatbot on Amazon Bedrock and LangChain, plus financial and fiscal APIs orchestrated with Step Functions, SQS and EventBridge.",
    stack: ["Python", "AWS Lambda", "Bedrock", "LangChain", "MongoDB"],
  },
  {
    company: "Hitss México",
    focus: "API quality for Claro Drive",
    role: "Backend / QA Intern",
    period: "2023 - 2024",
    location: "Remote",
    summary:
      "Tested Claro Drive APIs with Postman suites and automated Python and JavaScript checks, then documented failures and expected behavior for the team.",
    stack: ["Python", "JavaScript", "Postman"],
  },
  {
    company: "BASF",
    focus: "Python process automation",
    role: "Python Automation / Digitalization Intern",
    period: "2022 - 2023",
    location: "Mexico",
    summary:
      "Automated operational processes with Python and UiPath, then delivered pandas and Power BI analyses used in business decisions.",
    stack: ["Python", "UiPath", "pandas", "Power BI"],
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto grid max-w-[1320px] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-36"
    >
      <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
        <Reveal>
          <h2 className="max-w-[9ch] text-4xl leading-[0.98] font-medium tracking-[-0.045em] text-balance md:text-5xl">
            Selected systems.
          </h2>
          <p className="mt-6 max-w-[38ch] leading-relaxed text-pretty text-muted">
            Production work across banking, fintech and industrial automation,
            with the roles and tools behind it.
          </p>
          <a
            href="https://www.linkedin.com/in/oscarbucio"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent transition-colors duration-300 hover:text-foreground"
          >
            Full history on LinkedIn
            <ArrowUpRight size={16} aria-hidden />
          </a>
        </Reveal>
      </div>
      <div className="lg:col-span-7 lg:col-start-6">
        {jobs.map((job, i) => (
          <Reveal
            key={job.company}
            delay={i * 0.05}
            className="border-t border-edge py-9 first:pt-8 last:pb-0"
          >
            <article className="group">
              <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-5">
                <p className="text-sm font-medium text-accent">
                  {job.company}
                </p>
                <span className="font-mono text-xs tracking-[0.06em] text-muted">
                  {job.period}
                </span>
              </div>
              <h3 className="mt-3 text-2xl font-medium tracking-[-0.035em] transition-colors duration-300 group-hover:text-accent sm:text-3xl">
                {job.focus}
              </h3>
              <p className="mt-2 text-sm text-muted">
                {job.role}, {job.location}
              </p>
              <p className="mt-5 max-w-[65ch] leading-relaxed text-pretty text-muted">
                {job.summary}
              </p>
              <p className="mt-6 font-mono text-xs leading-relaxed tracking-[0.045em] text-muted uppercase">
                {job.stack.join(" / ")}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
