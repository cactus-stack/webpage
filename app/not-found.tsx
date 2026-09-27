import type { Metadata } from "next";
import { CtaLink } from "@/components/cta";
import { CautionTape, HudRule } from "@/components/hud";
import { LogoMark } from "@/components/logo-mark";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The requested page could not be found.",
  alternates: {
    canonical: null,
  },
  openGraph: null,
  twitter: null,
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100dvh] flex-col overflow-hidden">
      <CautionTape />
      <div
        aria-hidden
        className="hex-field pointer-events-none absolute inset-x-0 top-2.5 bottom-0 text-hex-line [--hex-fade:radial-gradient(75%_80%_at_70%_50%,black_30%,transparent)]"
      />
      <div className="relative mx-auto flex w-full max-w-[1380px] flex-1 flex-col justify-center px-5 py-20 sm:px-8 lg:px-10">
        <LogoMark title="Oscar Bucio" className="h-6 w-auto self-start text-foreground" />
        <HudRule
          className="mt-12 text-muted"
          left={<span className="text-accent-text">Error 404</span>}
          right="Signal lost"
        />
        <h1 className="title-card mt-8 text-[clamp(3.4rem,11vw,10rem)]">
          <span className="block">No route</span>
          <span className="title-light block text-[0.42em] text-muted">to this page</span>
        </h1>
        <p className="mt-8 max-w-[44ch] text-lg leading-relaxed text-pretty text-muted">
          The address may be wrong, or the page moved. Everything lives on the
          home page.
        </p>
        <div className="mt-10">
          <CtaLink href="/">Back to home</CtaLink>
        </div>
      </div>
    </main>
  );
}
