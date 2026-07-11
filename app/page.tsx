import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Facts } from "@/components/facts";
import { Experience } from "@/components/experience";
import { Capabilities } from "@/components/capabilities";
import { Architecture } from "@/components/architecture";
import { Stack } from "@/components/stack";
import { Contact } from "@/components/contact";
import { site } from "@/lib/site";

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: site.url,
  mainEntity: {
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    email: `mailto:${site.email}`,
    sameAs: [site.github, site.linkedin],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Hero />
        <Facts />
        <Experience />
        <Capabilities />
        <Architecture />
        <Stack />
        <Contact />
      </main>
      <footer className="border-t border-edge">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-5 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>&copy; 2026 {site.name}</p>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3">
            <a className="transition-colors hover:text-foreground" href="#main">
              Back to top
            </a>
            <a
              className="transition-colors hover:text-foreground"
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="transition-colors hover:text-foreground"
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </nav>
        </div>
      </footer>
    </>
  );
}
