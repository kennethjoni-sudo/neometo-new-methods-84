import { Button } from "@/components/ui/button";

const links = [
  { label: "Methods", href: "#methods" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Philosophy", href: "#philosophy" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="section-shell flex h-16 items-center justify-between md:h-20">
        <a
          href="#top"
          className="text-base font-bold tracking-[0.22em] text-ink transition-opacity hover:opacity-70"
        >
          NEOMETO
        </a>
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Button asChild size="sm" className="rounded-full px-5">
          <a href="#methods">Find a method</a>
        </Button>
      </div>
    </header>
  );
}
