import type { MDXComponents } from "mdx/types";
import AllImages from "@/components/all-images";
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    AllImages,
  };
}

export default useMDXComponents;
