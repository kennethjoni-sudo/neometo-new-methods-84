export const OPEN_METHOD_EVENT = "neometo:open-method";

export type MethodSlug = "spin" | "sleep" | "focus" | "overload" | "social" | "prepare";
export type ExperienceSlug = MethodSlug | "unload";

export type OpenMethodDetail = { slug: ExperienceSlug; seed?: string };

/** Ask the Problems section to open an experience from anywhere on the page. */
export function requestMethod(slug: ExperienceSlug, seed?: string) {
  window.dispatchEvent(
    new CustomEvent<OpenMethodDetail>(OPEN_METHOD_EVENT, {
      detail: seed ? { slug, seed } : { slug },
    }),
  );
}
