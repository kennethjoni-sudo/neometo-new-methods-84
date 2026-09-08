import { Link } from "@tanstack/react-router";

const pageLinks = [
  { label: "Philosophy", to: "/philosophy" },
  { label: "About", to: "/about" },
  { label: "FAQ", to: "/faq" },
  { label: "Sources", to: "/sources" },
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
          <p className="mt-3 text-xs text-muted-foreground/70">
            NEOMETO provides self-help and educational tools, not medical diagnosis.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-1">
            <Link
              to="/"
              hash="methods"
              className="inline-flex min-h-11 items-center text-sm font-medium text-muted-foreground transition-colors hover:text-ink"
            >
              Methods
            </Link>
            {pageLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="inline-flex min-h-11 items-center text-sm font-medium text-muted-foreground transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-1">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="inline-flex min-h-11 items-center text-sm text-muted-foreground/70 transition-colors hover:text-ink"
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
