export const OPEN_METHOD_EVENT = "neometo:open-method";

export type MethodSlug = "spin" | "sleep" | "focus" | "overload" | "social" | "prepare" | "friction";
export type ExperienceSlug = MethodSlug | "unload";

export type SeedReply = {
  content: string;
  method: MethodSlug | null;
  crisis: boolean;
};

export type OpenMethodDetail = {
  slug: ExperienceSlug;
  /** First message the person already typed, carried into Unload. */
  seed?: string;
  /** Reply already produced for that first message, so Unload doesn't ask twice. */
  seedReply?: SeedReply;
};

/** Ask the Problems section to open an experience from anywhere on the page. */
export function requestMethod(slug: ExperienceSlug, seed?: string, seedReply?: SeedReply) {
  const detail: OpenMethodDetail = { slug };
  if (seed) detail.seed = seed;
  if (seedReply) detail.seedReply = seedReply;
  window.dispatchEvent(new CustomEvent<OpenMethodDetail>(OPEN_METHOD_EVENT, { detail }));
}
