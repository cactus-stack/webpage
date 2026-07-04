import { CtaLink } from "@/components/cta";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-[-12%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--accent)_14%,transparent),transparent)]" />
      </div>
      <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-accent">
        404
      </p>
      <h1 className="mt-6 text-4xl tracking-tighter md:text-6xl">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-muted">
        The address may be wrong, or the page moved. Everything lives on the
        home page anyway.
      </p>
      <div className="mt-10">
        <CtaLink href="/">Back to home</CtaLink>
      </div>
    </main>
  );
}
