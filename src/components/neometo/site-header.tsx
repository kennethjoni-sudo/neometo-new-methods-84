import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";

import { Logo } from "@/components/neometo/logo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const pageLinks = [
  { label: "Philosophy", to: "/philosophy" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteHeader({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const [open, setOpen] = useState(false);

  return (
    <header className={cn("sticky top-0 z-50 backdrop-blur-xl", dark ? "border-b border-ink-line/60 bg-ink text-background" : "border-b border-border/60 bg-background/80")}>
      <div className="section-shell flex h-16 items-center justify-between md:h-20">
        <Link
          to="/"
          className={cn("inline-flex min-h-11 items-center text-xl transition-opacity hover:opacity-70 md:text-2xl", dark ? "text-background" : "text-ink")}
        >
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          <Link
            to="/methods"
            className={cn("inline-flex min-h-11 items-center text-sm font-medium transition-colors", dark ? "text-background/70 hover:text-background" : "text-muted-foreground hover:text-ink")}
          >
            Methods
          </Link>
          {pageLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={cn("inline-flex min-h-11 items-center text-sm font-medium transition-colors", dark ? "text-background/70 hover:text-background" : "text-muted-foreground hover:text-ink")}
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
                className={cn("rounded-full md:hidden", dark && "text-background hover:bg-ink-raised hover:text-background")}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[260px]">
              <SheetTitle className="text-xl text-ink">
                <Logo />
              </SheetTitle>
              <nav aria-label="Mobile" className="mt-10 flex flex-col gap-4">
                <Link
                  to="/methods"
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-11 items-center text-lg font-medium text-ink transition-opacity hover:opacity-70"
                >
                  Methods
                </Link>
                {pageLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="inline-flex min-h-11 items-center text-lg font-medium text-ink transition-opacity hover:opacity-70"
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
