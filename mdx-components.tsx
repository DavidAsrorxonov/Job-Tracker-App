import type { MDXComponents } from "mdx/types";
import { MDXComponents as customComponents } from "./app/docs/_components/mdx-components";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...customComponents,
    ...components,
  };
}
