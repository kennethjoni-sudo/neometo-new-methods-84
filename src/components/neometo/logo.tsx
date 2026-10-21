import { cn } from "@/lib/utils";

/** Wordmark: the two E's are drawn as three parallel bars (N≡OM≡TO). */
function BarE() {
  return (
    <span aria-hidden="true" className="mx-[0.06em] inline-flex h-[0.72em] w-[0.62em] flex-col justify-between">
      <span className="h-[0.09em] w-full rounded-full bg-current" />
      <span className="h-[0.09em] w-full rounded-full bg-current" />
      <span className="h-[0.09em] w-full rounded-full bg-current" />
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center font-display font-medium tracking-[0.14em]", className)}>
      <span className="sr-only">NEOMETO</span>
      <span aria-hidden="true" className="inline-flex items-center">
        N<BarE />OM<BarE />TO
      </span>
    </span>
  );
}
