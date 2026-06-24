import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

const nav = [
  { label: "How it works", href: "#how" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Trust & safety", href: "#trust" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3.5">
        <Link href="/" aria-label="Handshake home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden rounded-full sm:inline-flex">
            Sign in
          </Button>
          <Button className="rounded-full">Start a Handshake</Button>
        </div>
      </div>
    </header>
  );
}
