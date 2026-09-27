import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Facts } from "@/components/facts";
import { Architecture } from "@/components/architecture";
import { LogoMark } from "@/components/logo-mark";
import { Work } from "@/components/work";
import { Principles } from "@/components/principles";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { PageProgress } from "@/components/page-progress";
import { site } from "@/lib/site";

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: site.url,
  dateModified: site.lastModified,
  mainEntity: {
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.description,
    url: site.url,
    email: `mailto:${site.email}`,
    image: `${site.url}/images/portrait.jpg`,
    sameAs: [site.github, site.linkedin],
    homeLocation: {
      "@type": "Place",
      name: site.location,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Instituto Politécnico Nacional",
    },
    knowsAbout: [
      "Python backend engineering",
      "LLM agents",
      "Retrieval-augmented generation",
      "AWS serverless architecture",
      "MongoDB",
      "Financial technology",
    ],
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
      <PageProgress />
      <Nav />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Hero />
        <Facts />
        <Architecture />
        <Work />
        <Principles />
        <Experience />
        <Contact />
      </main>
      <footer className="border-t border-edge">
        <div className="mx-auto max-w-[1380px] px-5 py-10 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-4">
              <LogoMark className="h-7 w-auto text-foreground" />
              <div className="hud text-muted">
                <p className="text-foreground">{site.name}</p>
                <p>Backend / AI Engineer · Mexico City</p>
              </div>
            </div>
            <nav aria-label="Footer navigation" className="hud flex flex-wrap gap-x-6 gap-y-3 text-muted">
              <a className="transition-colors hover:text-foreground" href="#main">
                Back to top
              </a>
              <a
                className="transition-colors hover:text-foreground"
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
                <span className="sr-only">, opens in a new tab</span>
              </a>
              <a
                className="transition-colors hover:text-foreground"
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
                <span className="sr-only">, opens in a new tab</span>
              </a>
              <a
                className="transition-colors hover:text-foreground"
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
                <span className="sr-only">, opens in a new tab</span>
              </a>
            </nav>
          </div>
          <div className="hud mt-10 flex items-center gap-4 text-muted">
            <span>&copy; 2026 {site.name}</span>
            <span aria-hidden="true" className="h-px flex-1 bg-edge" />
            <span aria-hidden="true" className="text-edge-strong">End of transmission</span>
            <span aria-hidden="true" className="size-1.5 bg-accent" />
          </div>
        </div>
      </footer>
    </>
  );
}
