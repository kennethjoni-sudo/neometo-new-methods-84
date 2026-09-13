import { Suspense, useEffect, useState, type ComponentType } from "react";

import { Button } from "@/components/ui/button";
import {
  LazyFocusExperience,
  LazyFrictionExperience,
  LazyOverloadExperience,
  LazyPrepareExperience,
  LazySleepExperience,
  LazySocialExperience,
  LazyThoughtSpinExperience,
  MethodLoading,
} from "@/components/neometo/lazy-methods";
import { logEvent } from "@/lib/analytics";
import { OPEN_METHOD_EVENT, requestMethod, type MethodSlug, type OpenMethodDetail } from "@/lib/open-method";

const experiences: Record<MethodSlug, ComponentType<{ onClose: () => void }>> = {
  spin: LazyThoughtSpinExperience,
  sleep: LazySleepExperience,
  focus: LazyFocusExperience,
  overload: LazyOverloadExperience,
  social: LazySocialExperience,
  prepare: LazyPrepareExperience,
  friction: LazyFrictionExperience,
};

/** Start button for a single method page — opens the method right on the page. */
export function MethodLauncher({ slug, duration }: { slug: MethodSlug; duration: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<OpenMethodDetail>).detail;
      if (detail?.slug === slug) {
        logEvent("method_opened", { method: slug });
        setOpen(true);
      }
    };
    window.addEventListener(OPEN_METHOD_EVENT, handler);
    return () => window.removeEventListener(OPEN_METHOD_EVENT, handler);
  }, [slug]);

  const Experience = experiences[slug];

  return (
    <>
      {open && Experience ? <Experience onClose={() => setOpen(false)} /> : null}
      <Button
        size="lg"
        className="rounded-full px-8 text-base"
        onClick={() => requestMethod(slug)}
      >
        Start now — {duration}
      </Button>
    </>
  );
}
