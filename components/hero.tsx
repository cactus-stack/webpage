"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { CtaLink } from "@/components/cta";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    "data-reveal": true,
    initial: reduce ? false : ({ opacity: 0, y: 24 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.72, delay, ease: EASE },
  });

  return (
    <section className="relative min-h-[100dvh] overflow-hidden border-b border-edge">
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[28%] bg-surface" />
      <div className="relative mx-auto grid min-h-[100dvh] max-w-[1320px] items-center gap-8 px-5 pt-24 pb-7 sm:px-8 md:grid-cols-12 md:gap-8 lg:gap-12 lg:px-10 lg:pb-10">
        <div className="md:col-span-7 md:pr-4 lg:pr-6">
          <motion.p
            {...rise(0)}
            className="font-mono text-xs font-medium tracking-[0.12em] text-accent uppercase"
          >
            Oscar Bucio / Backend &amp; AI Engineer
          </motion.p>
          <motion.h1
            {...rise(0.08)}
            className="mt-5 text-[clamp(3.35rem,8.1vw,7.2rem)] leading-[0.88] font-medium tracking-[-0.075em] text-balance"
          >
            Backends for production AI.
          </motion.h1>
          <motion.p
            {...rise(0.18)}
            className="mt-7 max-w-[49ch] text-base leading-relaxed text-pretty text-muted sm:text-lg"
          >
            I build typed services, agent integrations and serverless
            workflows for banking and fintech teams.
          </motion.p>
          <motion.div
            {...rise(0.28)}
            className="mt-8 flex flex-col gap-3 min-[400px]:flex-row min-[400px]:flex-wrap"
          >
            <CtaLink href="#experience">Selected systems</CtaLink>
            <CtaLink href="mailto:oscarbucio2001@gmail.com" variant="ghost">
              Email me
            </CtaLink>
          </motion.div>
        </div>

        <motion.figure
          data-reveal
          initial={reduce ? false : { opacity: 0, scale: 0.985, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.86, delay: 0.14, ease: EASE }}
          className="relative h-[32dvh] min-h-52 w-full overflow-hidden rounded-2xl border border-edge bg-surface sm:min-h-64 md:col-span-5 md:h-[min(68dvh,38rem)] md:min-h-[28rem] lg:h-[min(68dvh,43rem)] lg:min-h-[34rem]"
        >
          <Image
            src="/images/portrait.jpg"
            alt="Portrait of Oscar Bucio"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 40vw"
            className="object-cover object-[50%_38%] grayscale contrast-[1.04]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgb(5_10_18_/_0.28))]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 ring-1 ring-white/10 ring-inset"
          />
        </motion.figure>
      </div>
    </section>
  );
}
