import { cn } from "@/lib/utils";
import logoLight from "@/assets/logo-light.png.asset.json";
import logoDark from "@/assets/logo-dark.png.asset.json";

/** Wordmark image: "Neometo" with the two lowercase E's in brand blue. */
export function Logo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const src = tone === "dark" ? logoLight.url : logoDark.url;
  return <img src={src} alt="NEOMETO" className={cn("h-6 w-auto md:h-7", className)} />;
}
