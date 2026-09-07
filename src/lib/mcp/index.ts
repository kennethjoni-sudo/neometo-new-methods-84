import { auth, defineMcp } from "@lovable.dev/mcp-js";

import findMethodTool from "./tools/find-method";
import getMethodTool from "./tools/get-method";
import listMethodsTool from "./tools/list-methods";

const supabaseUrl = (process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "").replace(
  /\/+$/,
  "",
);

export default defineMcp({
  name: "neometo-new-methods-84",
  title: "NEOMETO: New Methods (84)",
  version: "0.1.0",
  instructions:
    "Practical methods from NEOMETO for handling thoughts, sleep, focus, overload, conversations and preparation. Start with `find_method` using the person's own description of what is happening, then `get_method` for the steps. `list_methods` shows everything available. These are self-help and educational methods, not medical diagnosis.",
  auth: auth.oauth.issuer({
    issuer: `${supabaseUrl}/auth/v1`,
    acceptedAudiences: "authenticated",
    jwksUri: `${supabaseUrl}/auth/v1/.well-known/jwks.json`,
  }),
  tools: [findMethodTool, listMethodsTool, getMethodTool],
});
