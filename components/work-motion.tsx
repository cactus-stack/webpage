"use client";

import {
  ArrowRight,
  Bank,
  BracketsCurly,
  CheckCircle,
  Cloud,
  Code,
  Database,
  FlowArrow,
  Robot,
  ShieldCheck,
  TerminalWindow,
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
  variant: "banking" | "rag" | "quality";
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
  const copyOrder = workCase.variant === "rag" ? "lg:order-2" : "";
  const visualOrder = workCase.variant === "rag" ? "lg:order-1" : "";
  const layout =
    workCase.variant === "quality"
      ? "lg:grid-rows-[auto_1fr]"
      : workCase.variant === "rag"
        ? "lg:grid-cols-[1.16fr_0.84fr]"
        : "lg:grid-cols-[0.84fr_1.16fr]";

  return (
    <motion.article
      ref={ref}
      aria-labelledby={`${workCase.id}-title`}
      className={`work-card relative mb-5 grid overflow-hidden rounded-[1.75rem] border border-edge bg-surface shadow-[0_30px_90px_rgb(27_48_82_/_0.11)] lg:mb-8 lg:min-h-[calc(100dvh-8.5rem)] ${reduce ? "" : "lg:sticky"} ${position} ${layout}`}
      style={motionEnabled ? { opacity, y, scale } : undefined}
    >
      <CaseCopy workCase={workCase} className={copyOrder} />
      <div className={visualOrder}>
        <CaseVisual workCase={workCase} animate={motionEnabled} />
      </div>
    </motion.article>
  );
}

function CaseCopy({
  workCase,
  className,
}: {
  workCase: WorkCase;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 ${className ?? ""}`}
    >
      <div>
        <p className="text-sm font-medium text-accent">{workCase.company}</p>
        <p className="mt-2 font-mono text-xs leading-relaxed text-muted">
          {workCase.context}
        </p>
        <h3
          id={`${workCase.id}-title`}
          className="mt-6 max-w-[15ch] text-3xl leading-[1.02] font-medium tracking-[-0.04em] text-balance sm:text-4xl lg:text-[2.7rem]"
        >
          {workCase.title}
        </h3>
      </div>

      <div className="mt-10 lg:mt-16">
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
  if (workCase.variant === "banking") {
    return <BankingVisual animate={animate} />;
  }

  if (workCase.variant === "rag") {
    return <RagVisual animate={animate} />;
  }

  return <QualityVisual animate={animate} />;
}

function BankingVisual({ animate }: { animate: boolean }) {
  return (
    <figure className="flex h-full min-h-[31rem] flex-col border-t border-edge bg-surface-strong/45 p-6 sm:p-8 lg:min-h-0 lg:border-t-0 lg:border-l lg:p-10 xl:p-12">
      <figcaption className="font-mono text-xs text-muted">
        Typed banking integration
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
          icon={ShieldCheck}
          label="Enterprise authentication"
          detail="Access boundary"
        />
        <VerticalConnector />
        <FlowNode
          icon={Robot}
          label="Agent orchestration"
          detail="OpenAI Agents SDK"
        />
        <VerticalConnector />
        <FlowNode
          icon={BracketsCurly}
          label="Typed Python tools"
          detail="Pydantic contracts"
        />
        <VerticalConnector />
        <FlowNode
          icon={Bank}
          label="Banking services"
          detail="Banking integration"
        />
      </motion.ol>
    </figure>
  );
}

function RagVisual({ animate }: { animate: boolean }) {
  return (
    <figure className="flex h-full min-h-[34rem] flex-col border-t border-edge bg-surface-strong/45 p-6 sm:p-8 lg:min-h-0 lg:border-t-0 lg:border-r lg:p-10 xl:p-12">
      <figcaption className="font-mono text-xs text-muted">
        Retrieval and event orchestration
      </figcaption>

      <motion.div
        className="my-auto grid gap-3 py-8 sm:grid-cols-2"
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
          icon={ArrowRight}
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

function QualityVisual({ animate }: { animate: boolean }) {
  return (
    <figure className="flex min-h-[22rem] flex-col border-t border-edge bg-surface-strong/45 p-6 sm:p-8 lg:min-h-[19rem] lg:p-10 xl:min-h-[21rem] xl:p-12">
      <figcaption className="font-mono text-xs text-muted">
        Claro Drive API verification
      </figcaption>

      <motion.div
        className="my-auto grid items-center gap-6 py-8 md:grid-cols-[0.72fr_auto_1.28fr] md:gap-8"
        variants={sequence}
        initial={false}
        animate={animate ? "hidden" : "show"}
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <DiagramBlock
          icon={Cloud}
          label="Claro Drive APIs"
          detail="System under test"
          featured
        />

        <motion.div
          aria-hidden="true"
          variants={node}
          className="flex justify-center text-accent"
        >
          <ArrowRight
            size={24}
            weight="light"
            className="rotate-90 md:rotate-0"
          />
        </motion.div>

        <motion.div variants={node}>
          <p className="mb-3 font-mono text-xs text-muted">
            Verification layer
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <QualityNode
              className="sm:col-span-2"
              icon={TerminalWindow}
              label="Postman suites"
            />
            <QualityNode icon={Code} label="Python checks" />
            <QualityNode icon={CheckCircle} label="JavaScript checks" />
          </div>
        </motion.div>
      </motion.div>
    </figure>
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
      className="flex items-center gap-4 rounded-xl border border-edge bg-background/70 p-4 sm:p-5"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-edge bg-surface text-accent">
        <Icon size={20} weight="light" aria-hidden="true" />
      </span>
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
      className={`rounded-xl border p-4 sm:p-5 ${
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

function QualityNode({
  icon: Icon,
  label,
  className,
}: {
  icon: PhosphorIcon;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex min-h-20 items-center gap-3 rounded-xl border border-edge bg-background/65 p-4 ${className ?? ""}`}
    >
      <Icon size={20} weight="light" className="text-accent" aria-hidden />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}
