"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type PointerEvent } from "react";
import { CtaLink } from "@/components/cta";
import { site } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(pointerY, { stiffness: 120, damping: 22 });
  const rotateY = useSpring(pointerX, { stiffness: 120, damping: 22 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -42]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 86]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.055]);

  const rise = (delay: number) => ({
    initial: reduce ? false : ({ y: 28 } as const),
    animate: { y: 0 },
    transition: { duration: 0.82, delay, ease: EASE },
  });

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduce || event.pointerType === "touch" || !portraitRef.current) return;
    const bounds = portraitRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    pointerX.set(x * 3.2);
    pointerY.set(y * -3.2);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden border-b border-edge"
    >
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[24%] bg-surface" />
      <div
        aria-hidden
        className="absolute top-[18%] -left-[14rem] h-[28rem] w-[28rem] rounded-full border border-accent/15 opacity-70"
      />
      <div className="relative mx-auto grid min-h-[100dvh] max-w-[1380px] items-center gap-9 px-5 pt-24 pb-8 sm:px-8 md:grid-cols-12 md:gap-8 lg:gap-14 lg:px-10">
        <motion.div
          style={{ y: copyY }}
          className="relative z-10 md:col-span-7 md:pr-4 lg:pr-7"
        >
          <motion.p
            {...rise(0)}
            className="font-mono text-xs font-medium tracking-[0.12em] text-accent uppercase"
          >
            {site.name} / Backend &amp; AI Engineer
          </motion.p>
          <motion.h1
            {...rise(0.08)}
            className="mt-5 max-w-[8.6ch] text-[clamp(3.4rem,7.5vw,7.35rem)] leading-[0.88] font-medium tracking-[-0.076em] text-balance"
          >
            Backends for production AI.
          </motion.h1>
          <motion.p
            {...rise(0.18)}
            className="mt-7 max-w-[50ch] text-base leading-relaxed text-pretty text-muted sm:text-lg"
          >
            I design typed services, agent tools and cloud workflows that move AI
            from demos into regulated products.
          </motion.p>
          <motion.div
            {...rise(0.28)}
            className="mt-8 flex flex-col gap-3 min-[400px]:flex-row min-[400px]:flex-wrap"
          >
            <CtaLink href="#work">View work</CtaLink>
            <CtaLink href={`mailto:${site.email}`} variant="ghost">
              Email me
            </CtaLink>
          </motion.div>
        </motion.div>

        <motion.figure
          ref={portraitRef}
          initial={reduce ? false : { scale: 0.965, y: 28 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.12, ease: EASE }}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
          style={{
            y: imageY,
            rotateX: reduce ? 0 : rotateX,
            rotateY: reduce ? 0 : rotateY,
            transformPerspective: 1100,
          }}
          className="relative h-[34dvh] min-h-60 w-full overflow-hidden rounded-[1.75rem] border border-edge bg-surface shadow-[0_28px_90px_rgb(27_48_82_/_0.13)] sm:min-h-72 md:col-span-5 md:h-[min(72dvh,43rem)] md:min-h-[30rem] lg:min-h-[35rem]"
        >
          <motion.div style={{ scale: imageScale }} className="absolute inset-0">
            <Image
              src="/images/portrait.jpg"
              alt="Portrait of Oscar Bucio"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 40vw"
              className="object-cover object-[50%_38%] grayscale contrast-[1.04]"
            />
          </motion.div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_64%,rgb(7_10_16_/_0.28))]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-white/15 ring-inset"
          />
        </motion.figure>
      </div>
    </section>
  );
}
