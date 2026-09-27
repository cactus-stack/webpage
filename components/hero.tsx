"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { CtaLink } from "@/components/cta";
import { Brackets } from "@/components/hud";
import { LiveClock, ScrollPercent } from "@/components/hud-live";
import { TitleCard } from "@/components/title-card";
import { site } from "@/lib/site";

const scale = ["Agents", "RAG", "Typed tools", "Serverless", "Evals", "Observability"] as const;

const readouts = [
  { label: "Status", value: "Open to roles", live: true },
  { label: "Work auth", value: "U.S. citizen · No sponsorship" },
  { label: "Latest", value: "Agent tools for BBVA" },
] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-edge"
    >
      <div
        aria-hidden
        className="hex-field pointer-events-none absolute inset-y-0 right-0 w-[62%] text-hex-line [--hex-fade:radial-gradient(80%_75%_at_75%_45%,black_35%,transparent)]"
      />

      <div className="relative mx-auto grid min-h-[100dvh] max-w-[1380px] grid-rows-[1fr_auto] px-5 pt-24 sm:px-8 lg:px-10">
        <div className="grid items-end gap-12 pb-12 lg:grid-cols-12 lg:gap-10 lg:pb-16">
          <motion.div style={{ y: copyY }} className="relative z-10 lg:col-span-8">
            <TitleCard
              intro
              level={1}
              size="hero"
              index="01"
              label="Backend & AI engineering"
              meta="Rev. 2026.09"
              lines={[
                { text: "Backends" },
                { text: "for production", scale: 0.42, tone: "muted", light: true },
                {
                  text: "AI",
                  after: (
                    <span className="ml-[0.08em] inline-block size-[0.17em] translate-y-[-0.04em] bg-accent" />
                  ),
                },
              ]}
            />
            <p
              className="fade-rise mt-9 max-w-[52ch] text-base leading-relaxed text-pretty text-muted sm:text-lg"
              style={{ animationDelay: "0.55s" }}
            >
              I design typed services, agent tools and cloud workflows that move
              AI from demos into regulated products, currently for banking and
              fintech teams.
            </p>
            <div
              className="fade-rise mt-9 flex flex-col gap-3 min-[420px]:flex-row"
              style={{ animationDelay: "0.68s" }}
            >
              <CtaLink href="#architecture">See the system</CtaLink>
              <CtaLink href={site.resume} variant="ghost" newTab>
                Resume
              </CtaLink>
            </div>
          </motion.div>

          <div className="relative lg:col-span-4">
            <motion.figure
              style={{ y: imageY }}
              className="fade-rise relative p-3"
            >
              <Brackets className="border-foreground/60" size="size-4" />
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                <motion.div style={{ scale: imageScale }} className="absolute inset-0">
                  <Image
                    src="/images/portrait.webp"
                    alt="Portrait of Oscar Bucio in a suit"
                    fill
                    priority
                    sizes="(max-width: 1023px) 90vw, 30vw"
                    className="object-cover object-[50%_12%] grayscale contrast-[1.06]"
                  />
                </motion.div>
                <div aria-hidden className="scanlines pointer-events-none absolute inset-0 mix-blend-overlay" />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgb(6_8_12/0.55))]"
                />
                <div aria-hidden className="hud absolute inset-x-3 bottom-3 flex justify-between text-white/85">
                  <span>Fig. 01</span>
                  <span>19.43°N 99.13°W</span>
                </div>
                <span aria-hidden className="absolute top-3 right-3 size-2 bg-accent" />
              </div>
              <figcaption className="hud mt-3 flex justify-between text-muted">
                <span>{site.name}</span>
                <span>
                  CDMX <LiveClock />
                </span>
              </figcaption>
            </motion.figure>

            <dl className="fade-rise mt-6 border-t border-edge" style={{ animationDelay: "0.8s" }}>
              {readouts.map((item) => (
                <div
                  key={item.label}
                  className="hud grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3 border-b border-edge py-2.5"
                >
                  <dt className="text-muted">{item.label}</dt>
                  <dd className="flex items-center gap-2 text-foreground">
                    {"live" in item && item.live && (
                      <span aria-hidden className="blink size-1.5 bg-accent" />
                    )}
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Instrument scale across the fold, in the manner of a gauge. */}
        <div aria-hidden="true" className="hud relative pb-6 text-muted">
          <div className="flex items-end gap-4">
            <span className="w-12 shrink-0 text-foreground">
              <ScrollPercent />
            </span>
            <div className="relative flex-1">
              <div className="rule-draw h-px bg-edge-strong" />
              <div className="mt-2 grid grid-cols-3 gap-y-1 sm:grid-cols-6">
                {scale.map((tick) => (
                  <span key={tick} className="relative pt-2">
                    <span className="absolute top-[-0.6rem] left-0 h-2 w-px bg-edge-strong" />
                    {tick}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
