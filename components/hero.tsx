"use client";

import Image from "next/image";
import { Fragment } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { CtaLink } from "@/components/cta";

const ease = [0.32, 0.72, 0, 1] as const;
const HEADLINE = "Backend systems that put AI agents to work.".split(" ");

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 700], [0, 56]);

  // Pointer tilt on the portrait, driven by motion values (no re-renders)
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 160, damping: 18 });
  const springTiltY = useSpring(tiltY, { stiffness: 160, damping: 18 });

  const onPortraitMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * 10);
    tiltX.set(-py * 8);
  };

  const onPortraitLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const rise = (delay: number) => ({
    "data-reveal": true,
    initial: reduce
      ? false
      : ({ opacity: 0, y: 28, filter: "blur(10px)" } as const),
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section className="relative overflow-hidden">
      {/* Radial mesh orbs for depth; pure gradients, no filter cost */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-[-12%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--accent)_17%,transparent),transparent)]" />
        <div className="absolute bottom-[-30%] left-[-18%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--accent)_9%,transparent),transparent)]" />
      </div>
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 pt-36 pb-24 lg:grid-cols-12 lg:pt-44 lg:pb-32">
        <div className="lg:col-span-7">
          <motion.p
            {...rise(0)}
            className="inline-flex items-center rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-accent ring-1 ring-accent/25"
          >
            Backend / AI Engineer
          </motion.p>
          <h1 className="mt-8 text-4xl leading-[1.08] tracking-tighter text-balance md:text-5xl lg:text-6xl">
            {HEADLINE.map((word, i) => (
              <Fragment key={i}>
                <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <motion.span
                    data-reveal
                    className="inline-block"
                    initial={reduce ? false : { y: "115%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.8, delay: 0.08 + i * 0.05, ease }}
                  >
                    {word}
                  </motion.span>
                </span>
                {i < HEADLINE.length - 1 && " "}
              </Fragment>
            ))}
          </h1>
          <motion.p
            {...rise(0.34)}
            className="mt-7 max-w-[52ch] text-lg leading-relaxed text-muted"
          >
            Software engineer specializing in Python services, AWS serverless
            infrastructure, and the tooling that lets LLM agents run real
            business processes.
          </motion.p>
          <motion.div {...rise(0.46)} className="mt-11 flex flex-wrap gap-4">
            <CtaLink href="#contact">Get in touch</CtaLink>
            <CtaLink href="#experience" variant="ghost">
              View experience
            </CtaLink>
          </motion.div>
        </div>
        <motion.figure
          data-reveal
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          style={{
            y: reduce ? 0 : parallax,
            rotateX: springTiltX,
            rotateY: springTiltY,
            transformPerspective: 900,
          }}
          onPointerMove={onPortraitMove}
          onPointerLeave={onPortraitLeave}
          className="relative mx-auto w-full max-w-md lg:col-span-5 lg:translate-y-4"
        >
          {/* Double-bezel enclosure: outer tray + inner glass core */}
          <div className="rounded-[2rem] bg-foreground/[0.04] p-2 ring-1 ring-foreground/10">
            <div className="relative aspect-4/5 overflow-hidden rounded-[calc(2rem-0.5rem)]">
              <Image
                src="/images/portrait.jpg"
                alt="Oscar Bucio"
                fill
                priority
                sizes="(max-width: 512px) 100vw, (max-width: 1024px) 448px, 40vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] ring-1 ring-white/10 ring-inset"
              />
            </div>
          </div>
        </motion.figure>
      </div>
    </section>
  );
}
