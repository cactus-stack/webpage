import {
  ArrowUpRight,
  EnvelopeSimple,
  FileText,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react/dist/ssr";
import { CtaLink } from "@/components/cta";
import { CautionTape } from "@/components/hud";
import { Reveal } from "@/components/reveal";
import { TitleCard } from "@/components/title-card";
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
  {
    label: "Resume",
    value: "OscarBucio_Resume.pdf",
    href: site.resume,
    Icon: FileText,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      tabIndex={-1}
      className="relative overflow-hidden focus:outline-none"
    >
      <CautionTape />
      <div
        aria-hidden
        className="hex-field pointer-events-none absolute inset-x-0 top-2.5 bottom-0 text-hex-line [--hex-fade:radial-gradient(75%_85%_at_80%_55%,black_30%,transparent)]"
      />
      <div className="relative mx-auto grid max-w-[1380px] gap-16 px-5 py-28 sm:px-8 lg:px-10 lg:py-40 xl:grid-cols-12 xl:gap-10">
        <div className="xl:col-span-8">
          <TitleCard
            id="contact-title"
            index="07"
            label="Contact"
            meta="Open to roles"
            size="hero"
            lines={[
              { text: "Let’s build" },
              { text: "dependable", scale: 0.42, tone: "muted", light: true },
              {
                text: "AI",
                after: (
                  <span className="ml-[0.08em] inline-block size-[0.17em] translate-y-[-0.04em] bg-accent" />
                ),
              },
            ]}
          />
          <Reveal delay={0.12}>
            <p className="mt-9 max-w-[45ch] text-lg leading-relaxed text-pretty text-muted">
              Open to backend and AI engineering roles with U.S. teams. U.S.
              citizen based in Mexico City, no sponsorship required.
            </p>
            <div className="mt-9">
              <CtaLink href={`mailto:${site.email}`}>Email me</CtaLink>
            </div>
          </Reveal>
        </div>

        <Reveal className="xl:col-span-4 xl:pt-16" delay={0.08}>
          <p className="hud mb-4 text-muted">Channels</p>
          <ul aria-label="Contact channels" className="border-b border-edge">
            {channels.map(({ label, value, href, Icon }, index) => {
              const opensNewTab = !href.startsWith("mailto:");
              return (
                <li key={label} className="border-t border-edge">
                  <a
                    href={href}
                    target={opensNewTab ? "_blank" : undefined}
                    rel={opensNewTab ? "noopener noreferrer" : undefined}
                    className="group grid min-h-20 grid-cols-[2rem_2.5rem_minmax(0,1fr)_1.5rem] items-center gap-3 py-4 transition-[background-color,padding] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-surface hover:px-3"
                  >
                    <span className="hud text-muted">{String(index + 1).padStart(2, "0")}</span>
                    <Icon size={20} aria-hidden className="text-muted transition-colors duration-300 group-hover:text-accent" />
                    <span className="min-w-0">
                      <span className="hud block text-muted">{label}</span>
                      <span className="mt-1 block font-mono text-xs leading-relaxed break-words transition-colors duration-300 group-hover:text-accent-text sm:text-sm">
                        {value}
                      </span>
                      {opensNewTab && (
                        <span className="sr-only">, opens in a new tab</span>
                      )}
                    </span>
                    <ArrowUpRight
                      size={18}
                      aria-hidden
                      className="text-muted transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
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
