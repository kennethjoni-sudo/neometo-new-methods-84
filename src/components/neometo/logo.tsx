import { cn } from "@/lib/utils";
import { LogoArtwork } from "@/components/neometo/logo-artwork";

/** Original logo shapes, rendered sharply at every screen density. */
export function Logo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return <LogoArtwork tone={tone} className={cn("h-auto w-56 max-w-full md:w-64", className)} />;
}
