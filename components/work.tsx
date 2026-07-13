import { Reveal } from "@/components/reveal";
import {
  WorkMotion,
  type WorkCase,
} from "@/components/work-motion";

const workCases = [
  {
    id: "plexus-bbva",
    company: "Plexus Tech, BBVA project",
    context: "Conversational banking integration",
    title: "A typed agent boundary for banking.",
    summary:
      "Building a Python integration that connects OpenAI agents to banking services through typed tools and enterprise authentication.",
    stack: [
      "Python",
      "OpenAI Agents SDK",
      "Pydantic",
      "AWS",
      "Enterprise auth",
    ],
    variant: "banking",
  },
  {
    id: "fixat-rag",
    company: "FIXAT",
    context: "Serverless financial RAG",
    title: "Financial RAG on an event-driven backbone.",
    summary:
      "Built a serverless financial RAG system with Amazon Bedrock and LangChain, supported by AWS orchestration and MongoDB.",
    stack: [
      "Amazon Bedrock",
      "LangChain",
      "AWS Lambda",
      "Step Functions",
      "SQS",
      "EventBridge",
      "MongoDB",
    ],
    variant: "rag",
  },
  {
    id: "hitss-claro-drive",
    company: "Hitss México, Claro Drive",
    context: "API quality",
    title: "Repeatable API quality for Claro Drive.",
    summary:
      "Tested Claro Drive APIs with Postman suites and automated Python and JavaScript checks.",
    stack: ["Postman", "Python", "JavaScript"],
    variant: "quality",
  },
] satisfies readonly WorkCase[];

export function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      tabIndex={-1}
      className="mx-auto max-w-[1380px] px-5 py-28 focus:outline-none sm:px-8 lg:px-10 lg:py-44"
    >
      <Reveal>
        <div className="max-w-3xl">
          <h2
            id="work-title"
            className="max-w-[12ch] text-4xl leading-[0.96] font-medium tracking-[-0.052em] text-balance md:text-6xl"
          >
            Systems, shown in context.
          </h2>
          <p className="mt-6 max-w-[56ch] leading-relaxed text-pretty text-muted">
            Banking integration, financial retrieval and API quality, with the
            boundaries and tools that shaped each build.
          </p>
        </div>
      </Reveal>

      <WorkMotion cases={workCases} />
    </section>
  );
}
