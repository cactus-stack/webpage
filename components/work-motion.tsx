"use client";

import {
  ArrowRight,
  Bank,
  BracketsCurly,
  ChatCircleText,
  Cloud,
  Database,
  FlowArrow,
  MapPin,
  Queue,
  Robot,
  UserCheck,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export type WorkCase = {
  id: string;
  company: string;
  context: string;
  title: string;
  summary: string;
  stack: readonly string[];
  visual: "banking" | "platform" | "rag";
  layout: "copy-first" | "visual-first" | "stacked";
};

type WorkMotionProps = {
  cases: readonly WorkCase[];
};

const ease = [0.16, 1, 0.3, 1] as const;

const sequence: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.1,
    },
  },
};

const node: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.58, ease },
  },
};

const connector: Variants = {
  hidden: { opacity: 0, scaleY: 0 },
  show: {
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.42, ease },
  },
};

const stackPosition = [
  "lg:top-24 lg:z-10",
  "lg:top-[6.75rem] lg:z-20",
  "lg:top-[7.5rem] lg:z-30",
] as const;

export function WorkMotion({ cases }: WorkMotionProps) {
  return (
    <div className="relative mt-14 sm:mt-16 lg:mt-20">
      {cases.map((workCase, index) => (
        <WorkCard
          key={workCase.id}
          workCase={workCase}
          index={index}
        />
      ))}
    </div>
  );
}

function WorkCard({
  workCase,
  index,
}: {
  workCase: WorkCase;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [armed, setArmed] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 20%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.25, 1], [0.28, 0.76, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [56, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.978, 1]);

  useLayoutEffect(() => {
    if (reduce) return;

    const element = ref.current;
    if (
      element &&
      element.getBoundingClientRect().top > window.innerHeight * 0.84
    ) {
      setArmed(true);
    }
  }, [reduce]);

  const motionEnabled = armed && !reduce;
  const position = reduce ? "" : (stackPosition[index] ?? stackPosition.at(-1));
  const visualFirst = workCase.layout === "visual-first";
  const copyOrder = visualFirst ? "lg:order-2" : "";
  const visualOrder = visualFirst ? "lg:order-1" : "";
  const layout =
    workCase.layout === "stacked"
      ? "lg:grid-rows-[auto_1fr]"
      : visualFirst
        ? "lg:grid-cols-[1.16fr_0.84fr]"
        : "lg:grid-cols-[0.84fr_1.16fr]";

  return (
    <motion.article
      ref={ref}
      aria-labelledby={`${workCase.id}-title`}
      className={`work-card relative mb-5 grid overflow-hidden border border-edge-strong bg-surface shadow-[0_30px_90px_rgb(3_8_20/0.18)] lg:mb-8 lg:min-h-[calc(100dvh-8.5rem)] ${reduce ? "" : "lg:sticky"} ${position} ${layout}`}
      style={motionEnabled ? { opacity, y, scale } : undefined}
    >
      <CaseCopy
        workCase={workCase}
        index={index}
        stacked={workCase.layout === "stacked"}
        className={copyOrder}
      />
      <div className={visualOrder}>
        <CaseVisual workCase={workCase} animate={motionEnabled} />
      </div>
    </motion.article>
  );
}

function CaseCopy({
  workCase,
  index,
  stacked = false,
  className,
}: {
  workCase: WorkCase;
  index: number;
  stacked?: boolean;
  className?: string;
}) {
  // Stacked cards span the full width, so title and details sit side by side.
  const direction = stacked
    ? "lg:grid lg:grid-cols-2 lg:items-end lg:gap-12"
    : "";
  return (
    <div
      className={`flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 ${direction} ${className ?? ""}`}
    >
      <div>
        <p className="hud flex items-center gap-3 text-muted">
          <span className="text-accent-text">Case {String(index + 1).padStart(2, "0")}</span>
          <span aria-hidden="true" className="h-px w-8 bg-edge-strong" />
          {workCase.context}
        </p>
        <p className="mt-5 text-sm font-medium text-foreground">{workCase.company}</p>
        <h3
          id={`${workCase.id}-title`}
          className="mt-6 max-w-[15ch] text-3xl leading-[1.02] font-medium tracking-[-0.04em] text-balance sm:text-4xl lg:text-[2.7rem]"
        >
          {workCase.title}
        </h3>
      </div>

      <div className={stacked ? "mt-10 lg:mt-0" : "mt-10 lg:mt-16"}>
        <p className="max-w-[48ch] leading-relaxed text-pretty text-muted">
          {workCase.summary}
        </p>
        <ul
          aria-label={`Technologies used for ${workCase.context}`}
          className="mt-7 grid grid-cols-2 gap-x-4 gap-y-3"
        >
          {workCase.stack.map((technology) => (
            <li
              key={technology}
              className="border-l border-edge pl-3 font-mono text-[0.7rem] leading-5 text-muted"
            >
              {technology}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CaseVisual({
  workCase,
  animate,
}: {
  workCase: WorkCase;
  animate: boolean;
}) {
  if (workCase.visual === "banking") {
    return <BankingVisual animate={animate} />;
  }

  if (workCase.visual === "platform") {
    return <PlatformVisual animate={animate} />;
  }

  return <RagVisual animate={animate} />;
}

function BankingVisual({ animate }: { animate: boolean }) {
  return (
    <figure className="flex h-full min-h-[31rem] flex-col border-t border-edge bg-surface-strong/45 p-6 sm:p-8 lg:min-h-0 lg:border-t-0 lg:border-l lg:p-10 xl:p-12">
      <figcaption className="font-mono text-xs text-muted">
        Global agent, regional tools
      </figcaption>

      <motion.ol
        className="my-auto py-8"
        variants={sequence}
        initial={false}
        animate={animate ? "hidden" : "show"}
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
      >
        <FlowNode
          icon={Robot}
          label="Agent orchestration"
          detail="OpenAI Agents SDK"
        />
        <VerticalConnector />
        <FlowNode
          icon={BracketsCurly}
          label="Global tools module"
          detail="Typed Python, Pydantic contracts"
        />
        <VerticalConnector />
        <FlowNode
          icon={MapPin}
          label="Regional adaptation"
          detail="Mexico-specific workflows"
        />
        <VerticalConnector />
        <FlowNode
          icon={Bank}
          label="Banking services"
          detail="Async service clients"
        />
      </motion.ol>
    </figure>
  );
}

function RagVisual({ animate }: { animate: boolean }) {
  return (
    <figure className="flex h-full flex-col border-t border-edge bg-surface-strong/45 p-6 sm:p-8 lg:p-10 xl:p-12">
      <figcaption className="font-mono text-xs text-muted">
        Retrieval and event orchestration
      </figcaption>

      <motion.div
        className="my-auto grid gap-3 py-8 sm:grid-cols-2 lg:grid-cols-4"
        variants={sequence}
        initial={false}
        animate={animate ? "hidden" : "show"}
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <DiagramBlock
          className="sm:col-span-2"
          icon={FlowArrow}
          label="Retrieval runtime"
          detail="Amazon Bedrock + LangChain"
          featured
        />
        <DiagramBlock
          icon={Cloud}
          label="Serverless compute"
          detail="AWS Lambda"
        />
        <DiagramBlock
          icon={FlowArrow}
          label="Workflow orchestration"
          detail="Step Functions"
        />
        <DiagramBlock
          icon={Queue}
          label="Messaging"
          detail="SQS"
        />
        <DiagramBlock
          icon={FlowArrow}
          label="Event routing"
          detail="EventBridge"
        />
        <DiagramBlock
          className="sm:col-span-2"
          icon={Database}
          label="Persistence"
          detail="MongoDB"
        />
      </motion.div>
    </figure>
  );
}


function PlatformVisual({ animate }: { animate: boolean }) {
  return (
    <figure className="flex h-full min-h-[34rem] flex-col border-t border-edge bg-surface-strong/45 p-6 sm:p-8 lg:min-h-0 lg:border-t-0 lg:border-r lg:p-10 xl:p-12">
      <figcaption className="font-mono text-xs text-muted">
        WhatsApp LLM agent, monthly
      </figcaption>

      <motion.div
        className="my-auto py-8"
        variants={sequence}
        initial={false}
        animate={animate ? "hidden" : "show"}
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >

        <motion.ol
          variants={node}
          className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]"
        >
          <PipelineStep icon={ChatCircleText} value="140K+" label="webhooks" />
          <PipelineArrow />
          <PipelineStep icon={Robot} value="30K+" label="LLM turns" />
          <PipelineArrow />
          <PipelineStep icon={UserCheck} value="1,000+" label="leads" />
        </motion.ol>
        <motion.p
          variants={node}
          className="mt-4 font-mono text-[0.72rem] leading-relaxed text-muted"
        >
          Over 90% processing success. CI/CD with GitHub Actions across 20+
          services, backed by 7,000+ automated tests.
        </motion.p>
      </motion.div>
    </figure>
  );
}

// One stage of the WhatsApp funnel. It is a real sequence (messages in,
// model turns, qualified leads), so each stage carries its own figure.
function PipelineStep({
  icon: Icon,
  value,
  label,
}: {
  icon: PhosphorIcon;
  value: string;
  label: string;
}) {
  return (
    <li className="flex flex-col gap-4 border border-edge bg-background/65 p-5">
      <Icon size={20} weight="light" className="text-accent" aria-hidden />
      <span>
        <span className="title-card block text-4xl leading-none tabular-nums xl:text-5xl">{value}</span>
        <span className="mt-2 block text-sm text-muted">{label}</span>
      </span>
    </li>
  );
}

function PipelineArrow() {
  return (
    <li aria-hidden="true" className="flex justify-center text-accent">
      <ArrowRight size={20} weight="light" className="rotate-90 md:rotate-0" />
    </li>
  );
}

function FlowNode({
  icon: Icon,
  label,
  detail,
}: {
  icon: PhosphorIcon;
  label: string;
  detail: string;
}) {
  return (
    <motion.li
      variants={node}
      className="flex items-center gap-4 border border-edge bg-background/70 p-4 sm:p-5"
    >
      <Icon size={22} weight="light" aria-hidden="true" className="shrink-0 text-accent" />
      <span>
        <span className="block text-sm font-medium text-foreground">
          {label}
        </span>
        <span className="mt-1 block font-mono text-[0.68rem] text-muted">
          {detail}
        </span>
      </span>
    </motion.li>
  );
}

function VerticalConnector() {
  return (
    <motion.li
      aria-hidden="true"
      variants={connector}
      className="ml-[2.2rem] h-6 w-px origin-top bg-accent/55 sm:ml-10"
    />
  );
}

function DiagramBlock({
  icon: Icon,
  label,
  detail,
  className,
  featured = false,
}: {
  icon: PhosphorIcon;
  label: string;
  detail: string;
  className?: string;
  featured?: boolean;
}) {
  return (
    <motion.div
      variants={node}
      className={`border p-4 sm:p-5 ${
        featured
          ? "border-accent/45 bg-accent/10"
          : "border-edge bg-background/65"
      } ${className ?? ""}`}
    >
      <Icon
        size={featured ? 26 : 21}
        weight="light"
        className="text-accent"
        aria-hidden="true"
      />
      <p className="mt-5 text-sm font-medium text-foreground">{label}</p>
      <p className="mt-1 font-mono text-[0.68rem] leading-relaxed text-muted">
        {detail}
      </p>
    </motion.div>
  );
}
