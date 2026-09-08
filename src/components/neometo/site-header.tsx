import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const pageLinks = [
  { label: "Philosophy", to: "/philosophy" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="section-shell flex h-16 items-center justify-between md:h-20">
        <Link
          to="/"
          className="text-base font-bold tracking-[0.22em] text-ink transition-opacity hover:opacity-70"
        >
          NEOMETO
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          <Link
            to="/methods"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-ink"
          >
            Methods
          </Link>
          {pageLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="rounded-full px-5">
            <Link to="/" hash="methods">
              Find a method
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[260px]">
              <SheetTitle className="text-base font-bold tracking-[0.22em] text-ink">
                NEOMETO
              </SheetTitle>
              <nav aria-label="Mobile" className="mt-10 flex flex-col gap-6">
                <Link
                  to="/methods"
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-ink transition-opacity hover:opacity-70"
                >
                  Methods
                </Link>
                {pageLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium text-ink transition-opacity hover:opacity-70"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
