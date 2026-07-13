import {
  ArrowUpRight,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react/dist/ssr";
import { CtaLink } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

const channels = [
  {
    label: "GitHub",
    value: "github.com/cactus-stack",
    href: site.github,
    Icon: GithubLogo,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/oscarbucio",
    href: site.linkedin,
    Icon: LinkedinLogo,
  },
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    Icon: EnvelopeSimple,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      tabIndex={-1}
      className="relative overflow-hidden bg-surface focus:outline-none"
    >
      <div
        aria-hidden
        className="absolute -right-40 bottom-[-19rem] size-[38rem] rounded-full border border-accent/15"
      />
      <div className="relative mx-auto grid max-w-[1380px] gap-16 px-5 py-28 sm:px-8 lg:px-10 lg:py-44 xl:grid-cols-12 xl:gap-10">
        <Reveal className="xl:col-span-7">
          <h2
            id="contact-title"
            className="max-w-[9ch] text-5xl leading-[0.91] font-medium tracking-[-0.067em] text-balance sm:text-6xl lg:text-8xl"
          >
            Let&apos;s build dependable AI.
          </h2>
          <p className="mt-7 max-w-[45ch] text-lg leading-relaxed text-pretty text-muted">
            Open to backend and AI engineering roles with U.S. teams.
          </p>
          <div className="mt-9">
            <CtaLink href={`mailto:${site.email}`}>Email me</CtaLink>
          </div>
        </Reveal>

        <Reveal className="xl:col-span-4 xl:col-start-9 xl:pt-8" delay={0.08}>
          <ul aria-label="Contact channels">
            {channels.map(({ label, value, href, Icon }) => {
              const opensNewTab = !href.startsWith("mailto:");
              return (
                <li key={label} className="border-t border-edge">
                  <a
                    href={href}
                    target={opensNewTab ? "_blank" : undefined}
                    rel={opensNewTab ? "noopener noreferrer" : undefined}
                    className="group grid min-h-24 grid-cols-[2.5rem_minmax(0,1fr)_1.5rem] items-center gap-3 py-5 transition-[color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-1"
                  >
                    <Icon size={20} aria-hidden className="text-muted" />
                    <span className="min-w-0">
                      <span className="block text-xs text-muted">{label}</span>
                      <span className="mt-1 block break-words font-mono text-xs leading-relaxed transition-colors duration-300 group-hover:text-accent sm:text-sm">
                        {value}
                      </span>
                      {opensNewTab && (
                        <span className="sr-only">, opens in a new tab</span>
                      )}
                    </span>
                    <ArrowUpRight
                      size={18}
                      aria-hidden
                      className="text-muted transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
