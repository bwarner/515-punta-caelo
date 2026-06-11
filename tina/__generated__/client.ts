import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({
  cacheDir:
    "/Users/bwarner/devel/515-punta-caelo/tina/__generated__/.cache/1780938349967",
  url: "https://content.tinajs.io/2.4/content/e17bde00-9308-484c-bdbd-247c42a25514/github/main",
  token: "9952e49d810013949f5c870c1a9de6e88003621e",
  queries,
});
export default client;
