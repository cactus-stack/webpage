import { TitleCard } from "@/components/title-card";
import {
  WorkMotion,
  type WorkCase,
} from "@/components/work-motion";

const workCases = [
  {
    id: "plexus-bbva",
    company: "Plexus Tech, client BBVA",
    context: "Agent Blue, global core team",
    title: "Tool modules for a global banking agent.",
    summary:
      "Built production tool modules used across global and Mexico-specific agent workflows, plus the regional adaptation patterns that let Mexico adopt the global tools module instead of duplicating it.",
    stack: [
      "Python",
      "OpenAI Agents SDK",
      "Pydantic",
      "Async service clients",
      "Enterprise auth",
      "End-to-end tests",
    ],
    visual: "banking",
    layout: "copy-first",
  },
  {
    id: "siatech-platform",
    company: "Siatech",
    context: "Serverless platform and LLM agent",
    title: "A serverless platform at 60M requests a year.",
    summary:
      "Helped build and operate a serverless AWS platform for 12,000+ users, including an LLM-powered WhatsApp agent that handles 140,000+ webhooks a month. Cut cost per request 39% through MongoDB query, batching and caching work.",
    stack: [
      "Python",
      "AWS Lambda",
      "MongoDB",
      "LLM agents",
      "WhatsApp webhooks",
      "GitHub Actions",
    ],
    visual: "platform",
    layout: "visual-first",
  },
  {
    id: "fixat-rag",
    company: "FIXAT",
    context: "RAG conversational agent",
    title: "Financial RAG, from prototype to production.",
    summary:
      "Owned the design, implementation and production deployment of a RAG agent used by thousands of customers, improving lead-capture efficiency by up to 60%.",
    stack: [
      "Amazon Bedrock",
      "LangChain",
      "OpenAI API",
      "AWS Lambda",
      "Step Functions",
      "SQS",
      "EventBridge",
      "MongoDB",
    ],
    visual: "rag",
    layout: "stacked",
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
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <TitleCard
          className="lg:col-span-8"
          id="work-title"
          lines={[
            { text: "Systems" },
            { text: "shown in", scale: 0.42, tone: "muted", light: true },
            { text: "context" },
          ]}
        />
        <div className="lg:col-span-4">
          <p className="max-w-[46ch] leading-relaxed text-pretty text-muted">
            Banking agents, a high-scale serverless platform and financial
            retrieval, with the boundaries and results that shaped each build.
          </p>
        </div>
      </div>

      <WorkMotion cases={workCases} />
    </section>
  );
}
