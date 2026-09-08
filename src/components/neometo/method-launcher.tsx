import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ThoughtSpinExperience } from "@/components/neometo/thought-spin";
import { SleepExperience } from "@/components/neometo/sleep";
import { FocusExperience } from "@/components/neometo/focus";
import { OverloadExperience } from "@/components/neometo/overload";
import { SocialExperience } from "@/components/neometo/social";
import { PrepareExperience } from "@/components/neometo/prepare";
import { FrictionExperience } from "@/components/neometo/friction";
import { logEvent } from "@/lib/analytics";
import { OPEN_METHOD_EVENT, requestMethod, type MethodSlug, type OpenMethodDetail } from "@/lib/open-method";

const experiences: Record<MethodSlug, (props: { onClose: () => void }) => React.ReactNode> = {
  spin: ThoughtSpinExperience,
  sleep: SleepExperience,
  focus: FocusExperience,
  overload: OverloadExperience,
  social: SocialExperience,
  prepare: PrepareExperience,
  friction: FrictionExperience,
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
