import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { NavLinks } from "@/components/nav-links";
import { ThemeToggle } from "@/components/theme-toggle";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-4 z-40 px-4 sm:top-6">
      <nav className="mx-auto flex h-14 w-max items-center gap-5 rounded-full bg-background/70 pl-6 pr-4 ring-1 ring-foreground/10 backdrop-blur-2xl sm:gap-7">
        <a href="#main" className="font-medium tracking-tight">
          Oscar Bucio
        </a>
        <NavLinks />
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
