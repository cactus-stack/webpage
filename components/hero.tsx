"use client";

import Image from "next/image";
import { Fragment } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;
const HEADLINE = "Backend systems that put AI agents to work.".split(" ");

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 700], [0, 56]);

  const rise = (delay: number) => ({
    "data-reveal": true,
    initial: reduce ? false : ({ opacity: 0, y: 24 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section className="relative overflow-hidden">
      {/* Radial accent wash for depth; reads strongest on the dark theme */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(52rem_36rem_at_78%_10%,color-mix(in_srgb,var(--accent)_13%,transparent),transparent_70%)]"
      />
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 pt-32 pb-20 lg:grid-cols-12 lg:pt-40 lg:pb-28">
        <div className="lg:col-span-7">
          <motion.p
            {...rise(0)}
            className="font-mono text-[13px] uppercase tracking-[0.2em] text-accent"
          >
            Backend / AI Engineer
          </motion.p>
          <h1 className="mt-6 text-4xl leading-[1.08] tracking-tighter text-balance md:text-5xl lg:text-6xl">
            {HEADLINE.map((word, i) => (
              <Fragment key={i}>
                <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <motion.span
                    data-reveal
                    className="inline-block"
                    initial={reduce ? false : { y: "115%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.65, delay: 0.06 + i * 0.05, ease }}
                  >
                    {word}
                  </motion.span>
                </span>
                {i < HEADLINE.length - 1 && " "}
              </Fragment>
            ))}
          </h1>
          <motion.p
            {...rise(0.32)}
            className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted"
          >
            Software engineer specializing in Python services, AWS serverless
            infrastructure, and the tooling that lets LLM agents run real
            business processes.
          </motion.p>
          <motion.div {...rise(0.42)} className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex h-12 items-center rounded-full bg-foreground px-7 font-medium text-background transition duration-300 hover:-translate-y-0.5 hover:opacity-90 active:translate-y-px"
            >
              Get in touch
            </a>
            <a
              href="#experience"
              className="inline-flex h-12 items-center rounded-full border border-edge px-7 font-medium transition duration-300 hover:-translate-y-0.5 hover:border-accent/60 active:translate-y-px"
            >
              View experience
            </a>
          </motion.div>
        </div>
        <motion.figure
          data-reveal
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease }}
          style={{ y: reduce ? 0 : parallax }}
          className="relative mx-auto w-full max-w-md lg:col-span-5 lg:translate-y-4"
        >
          <div className="relative aspect-4/5 overflow-hidden rounded-2xl border border-edge">
            <Image
              src="/images/portrait.jpg"
              alt="Oscar Bucio"
              fill
              priority
              sizes="(max-width: 512px) 100vw, (max-width: 1024px) 448px, 40vw"
              className="object-cover"
            />
          </div>
        </motion.figure>
      </div>
    </section>
  );
}
