import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Facts } from "@/components/facts";
import { Experience } from "@/components/experience";
import { Capabilities } from "@/components/capabilities";
import { Stack } from "@/components/stack";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" className="flex-1">
        <Hero />
        <Facts />
        <Experience />
        <Capabilities />
        <Stack />
        <Contact />
      </main>
      <footer className="border-t border-edge">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-2 px-6 py-8 text-sm text-muted">
          <p>&copy; 2026 Oscar Daniel Bucio Barrera</p>
          <p>Mexico City</p>
        </div>
      </footer>
    </>
  );
}
