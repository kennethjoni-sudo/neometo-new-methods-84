import { focusMethod } from "@/components/neometo/focus";
import { MethodExperience, type MethodConfig } from "@/components/neometo/method-engine";

/** The existing Focus technique, entering its guided phases without a second start screen. */
const quickStartMethod: MethodConfig = {
  ...focusMethod,
  phases: focusMethod.phases?.filter((phase) => phase.type !== "begin"),
};

export function QuickStartExperience({ onClose }: { onClose: () => void }) {
  return <MethodExperience config={quickStartMethod} onClose={onClose} />;
}