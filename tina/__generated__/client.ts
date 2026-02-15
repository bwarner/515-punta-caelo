import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({
  cacheDir:
    "/Users/bwarner/devel/515-punta-caelo/tina/__generated__/.cache/1771145938734",
  url: "https://content.tinajs.io/2.1/content/88b70312-f5f7-4781-a2b4-f79704cc43bd/github/main",
  token: "647b13c50017efe4e6d51658217044e7c04514c9",
  queries,
});
export default client;
