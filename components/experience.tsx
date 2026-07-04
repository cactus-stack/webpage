import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";

type Job = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  stack: string[];
};

const jobs: Job[] = [
  {
    company: "Plexus Tech",
    role: "Software Engineer, assigned to BBVA",
    period: "2026 - Present",
    location: "Mexico City",
    summary:
      "Building the integration layer between AI agents and banking services: typed Python tools, orchestration patterns, and enterprise auth flows, validated end to end against real environments.",
    stack: ["Python", "OpenAI Agents SDK", "Pydantic", "AWS"],
  },
  {
    company: "FIXAT",
    role: "Software Engineer",
    period: "2024 - 2025",
    location: "Remote",
    summary:
      "Built a serverless RAG chatbot on Amazon Bedrock and LangChain, plus REST APIs for financial and fiscal data, orchestrated with Step Functions, SQS, and EventBridge.",
    stack: ["Python", "AWS Lambda", "Bedrock", "LangChain", "MongoDB"],
  },
  {
    company: "Hitss México",
    role: "Backend / QA Intern",
    period: "2023 - 2024",
    location: "Remote",
    summary:
      "Tested APIs for the Claro Drive platform: Postman suites plus automated scripts in Python and JavaScript, with detailed documentation for the team.",
    stack: ["Python", "JavaScript", "Postman"],
  },
  {
    company: "BASF",
    role: "Python Automation / Digitalization Intern",
    period: "2022 - 2023",
    location: "Mexico",
    summary:
      "Led process automation and digitalization with Python and UiPath, and delivered pandas and Power BI analyses that informed business decisions.",
    stack: ["Python", "UiPath", "pandas", "Power BI"],
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto grid max-w-[1200px] gap-14 px-6 py-24 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20 lg:py-32"
    >
      <div className="lg:sticky lg:top-24 lg:self-start">
        <Reveal>
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">Experience</h2>
          <p className="mt-4 max-w-[40ch] leading-relaxed text-pretty text-muted">
            Four years across banking, fintech, and industrial automation.
          </p>
          <a
            href="https://www.linkedin.com/in/oscarbucio"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1 text-sm text-accent transition-opacity hover:opacity-80"
          >
            Full history on LinkedIn
            <ArrowUpRight size={16} />
          </a>
        </Reveal>
      </div>
      <div className="divide-y divide-edge">
        {jobs.map((job, i) => (
          <Reveal
            key={job.company}
            delay={i * 0.05}
            className="py-12 first:pt-0 last:pb-0"
          >
            <article className="group">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-xl font-medium tracking-tight transition-colors duration-300 group-hover:text-accent">
                  {job.company}
                </h3>
                <span className="font-mono text-sm text-muted">
                  {job.period}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted">
                {job.role}, {job.location}
              </p>
              <p className="mt-5 leading-relaxed text-muted">{job.summary}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {job.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-edge px-3 py-1 font-mono text-xs text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
