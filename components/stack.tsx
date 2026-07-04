"use client";

import { useState } from "react";
import { Pause, Play } from "@phosphor-icons/react";
import { BrandMark, stackLogos } from "@/components/logos";
import { Reveal } from "@/components/reveal";

function LogoRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      className={`flex shrink-0 items-center gap-14 pr-14 ${hidden ? "marquee-dup" : ""}`}
      aria-hidden={hidden || undefined}
    >
      {stackLogos.map((logo) => (
        <li key={logo.name} className="flex items-center gap-3 text-muted">
          <BrandMark logo={logo} />
          <span className="font-mono text-sm whitespace-nowrap">
            {logo.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Stack() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 lg:py-24">
      <Reveal>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-medium tracking-tight">
            Tools I work with
          </h2>
          {/* WCAG 2.2.2: auto-moving content needs a pause mechanism */}
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            aria-label={paused ? "Play the tools carousel" : "Pause the tools carousel"}
            className="marquee-toggle inline-flex h-9 w-9 items-center justify-center rounded-full border border-edge text-muted transition-colors hover:border-foreground hover:text-foreground"
          >
            {paused ? <Play size={16} /> : <Pause size={16} />}
          </button>
        </div>
        <div className="marquee relative mt-10 overflow-hidden" data-paused={paused}>
          {/* Edge fades so the loop enters and exits softly */}
          <div className="marquee-fade pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="marquee-fade pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
          <div className="marquee-track flex w-max">
            <LogoRow />
            <LogoRow hidden />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
