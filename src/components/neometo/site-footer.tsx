const footerLinks = [
  { label: "Methods", href: "#methods" },
  { label: "About", href: "#philosophy" },
  { label: "For Work", href: "#coming" },
  { label: "Privacy", href: "#footer" },
  { label: "Contact", href: "#footer" },
];

export function SiteFooter() {
  return (
    <footer id="footer" className="border-t border-border/70 py-14">
      <div className="section-shell flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-base font-extrabold tracking-[0.22em] text-ink">NEOMETO</p>
          <p className="mt-2 text-sm text-muted-foreground">New Methods for Modern Minds.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="section-shell mt-10 border-t border-border/70 pt-6">
        <p className="text-xs text-muted-foreground">
          NEOMETO provides self-help and educational tools, not medical diagnosis.
        </p>
      </div>
    </footer>
  );
}
