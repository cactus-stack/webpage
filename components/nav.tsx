import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-4 z-40 px-4 sm:top-6">
      <nav className="mx-auto flex h-14 w-max items-center gap-5 rounded-full bg-background/70 pl-6 pr-4 ring-1 ring-foreground/10 backdrop-blur-2xl sm:gap-7">
        <a href="#main" className="font-medium tracking-tight">
          Oscar Bucio
        </a>
        <ul className="hidden items-center gap-6 text-sm text-muted sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-[width] after:duration-500 after:ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <span className="h-4 w-px bg-foreground/10" aria-hidden />
        <div className="flex items-center gap-4 text-muted">
          <ThemeToggle />
          <a
            href="https://github.com/Dany0343"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="-m-2 p-2 transition-colors duration-300 hover:text-foreground"
          >
            <GithubLogo size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/oscarbucio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="-m-2 p-2 transition-colors duration-300 hover:text-foreground"
          >
            <LinkedinLogo size={20} />
          </a>
        </div>
      </nav>
    </header>
  );
}
