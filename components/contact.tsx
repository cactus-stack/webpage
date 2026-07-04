import {
  ArrowUpRight,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react/dist/ssr";
import { CtaLink } from "@/components/cta";
import { Reveal } from "@/components/reveal";

const channels = [
  {
    label: "GitHub",
    value: "github.com/Dany0343",
    href: "https://github.com/Dany0343",
    Icon: GithubLogo,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/oscarbucio",
    href: "https://www.linkedin.com/in/oscarbucio",
    Icon: LinkedinLogo,
  },
  {
    label: "Email",
    value: "oscarbucio2001@gmail.com",
    href: "mailto:oscarbucio2001@gmail.com",
    Icon: EnvelopeSimple,
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-edge">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -bottom-48 left-[10%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--accent)_11%,transparent),transparent)]" />
      </div>
      <div className="mx-auto grid max-w-[1200px] gap-14 px-6 py-24 lg:grid-cols-12 lg:py-36">
        <Reveal className="lg:col-span-7">
          <h2 className="max-w-[18ch] text-4xl leading-none tracking-tighter text-balance md:text-5xl lg:text-6xl">
            Looking for a backend or AI engineer?
          </h2>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted">
            Open to remote roles with U.S. teams, working from Mexico City on
            U.S. hours.
          </p>
          <div className="mt-10">
            <CtaLink href="mailto:oscarbucio2001@gmail.com">Email me</CtaLink>
          </div>
        </Reveal>
        <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
          <ul className="divide-y divide-edge">
            {channels.map(({ label, value, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="group -mx-4 flex items-center justify-between gap-4 rounded-2xl px-4 py-5 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-foreground/[0.04]"
                >
                  <span className="flex items-center gap-3">
                    <Icon size={20} className="text-muted" />
                    <span className="flex flex-col">
                      <span className="text-sm text-muted">{label}</span>
                      <span className="font-mono text-sm transition-colors duration-300 group-hover:text-accent">{value}</span>
                    </span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
