import {
  ArrowUpRight,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react/dist/ssr";
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
    <section id="contact" className="border-t border-edge">
      <div className="mx-auto grid max-w-[1200px] gap-14 px-6 py-24 lg:grid-cols-12 lg:py-32">
        <Reveal className="lg:col-span-7">
          <h2 className="max-w-[18ch] text-4xl leading-none tracking-tighter text-balance md:text-5xl lg:text-6xl">
            Looking for a backend or AI engineer?
          </h2>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted">
            Open to remote roles with U.S. teams, working from Mexico City on
            U.S. hours.
          </p>
          <a
            href="mailto:oscarbucio2001@gmail.com"
            className="mt-10 inline-flex h-12 items-center rounded-full bg-foreground px-7 font-medium text-background transition duration-300 hover:-translate-y-0.5 hover:opacity-90 active:translate-y-px"
          >
            Email me
          </a>
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
                  className="group flex items-center justify-between gap-4 py-5"
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
