import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-edge bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <a href="#main" className="font-medium tracking-tight">
          Oscar Bucio
        </a>
        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-7 text-sm text-muted sm:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-[width] after:duration-300 hover:text-foreground hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <span className="hidden h-4 w-px bg-edge sm:block" aria-hidden />
          <div className="flex items-center gap-4 text-muted">
            <a
              href="https://github.com/Dany0343"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="-m-2 p-2 transition-colors hover:text-foreground"
            >
              <GithubLogo size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/oscarbucio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="-m-2 p-2 transition-colors hover:text-foreground"
            >
              <LinkedinLogo size={20} />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
