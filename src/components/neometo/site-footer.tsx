import { Link } from "@tanstack/react-router";

const primaryLinks = [
  { label: "Methods", to: "/", hash: "methods" },
  { label: "Philosophy", to: "/philosophy" },
  { label: "About", to: "/about" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
] as const;

const legalLinks = [
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "Disclaimer", to: "/disclaimer" },
] as const;

export function SiteFooter() {
  return (
    <footer id="footer" className="border-t border-border/70 py-14">
      <div className="section-shell flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-base font-bold tracking-[0.22em] text-ink">NEOMETO</p>
          <p className="mt-2 text-sm text-muted-foreground">New Methods for Modern Minds.</p>
        </div>

        <div className="flex flex-col gap-4">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {primaryLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                hash={"hash" in link ? link.hash : undefined}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="Legal" className="flex flex-wrap gap-x-8 gap-y-3">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm text-muted-foreground/70 transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
