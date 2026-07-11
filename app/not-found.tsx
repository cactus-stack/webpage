import { CtaLink } from "@/components/cta";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[18dvh] bg-surface" />
      <p className="relative font-mono text-[13px] uppercase tracking-[0.2em] text-accent">
        404
      </p>
      <h1 className="relative mt-6 text-4xl tracking-tighter md:text-6xl">
        This page isn&apos;t here.
      </h1>
      <p className="relative mt-6 max-w-[40ch] text-lg leading-relaxed text-muted">
        The address may be wrong, or the page moved. Everything lives on the
        home page anyway.
      </p>
      <div className="relative mt-10">
        <CtaLink href="/">Back to home</CtaLink>
      </div>
    </main>
  );
}
