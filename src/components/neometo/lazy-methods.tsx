import { lazy } from "react";

/**
 * Method experiences are loaded on demand so the initial page load stays light.
 * Each module exports a named component, so map it onto a default export.
 */
export const LazyThoughtSpinExperience = lazy(() =>
  import("@/components/neometo/thought-spin").then((m) => ({ default: m.ThoughtSpinExperience })),
);
export const LazySleepExperience = lazy(() =>
  import("@/components/neometo/sleep").then((m) => ({ default: m.SleepExperience })),
);
export const LazyFocusExperience = lazy(() =>
  import("@/components/neometo/focus").then((m) => ({ default: m.FocusExperience })),
);
export const LazyOverloadExperience = lazy(() =>
  import("@/components/neometo/overload").then((m) => ({ default: m.OverloadExperience })),
);
export const LazySocialExperience = lazy(() =>
  import("@/components/neometo/social").then((m) => ({ default: m.SocialExperience })),
);
export const LazyPrepareExperience = lazy(() =>
  import("@/components/neometo/prepare").then((m) => ({ default: m.PrepareExperience })),
);
export const LazyFrictionExperience = lazy(() =>
  import("@/components/neometo/friction").then((m) => ({ default: m.FrictionExperience })),
);
export const LazyUnloadExperience = lazy(() =>
  import("@/components/neometo/unload").then((m) => ({ default: m.UnloadExperience })),
);

/** Quiet full-screen placeholder while a method's code arrives. */
export function MethodLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink">
      <div
        className="size-10 animate-spin rounded-full border-2 border-background/20 border-t-brand"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
