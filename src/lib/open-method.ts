export const OPEN_METHOD_EVENT = "neometo:open-method";

export type MethodSlug = "spin" | "sleep" | "focus" | "overload" | "social" | "prepare";

/** Ask the Problems section to open a method experience from anywhere on the page. */
export function requestMethod(slug: MethodSlug) {
  window.dispatchEvent(new CustomEvent<MethodSlug>(OPEN_METHOD_EVENT, { detail: slug }));
}
