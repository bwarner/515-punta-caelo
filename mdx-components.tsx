import type { MDXComponents } from "mdx/types";

// Custom components
import AllImages from "@/components/all-images";
import FooterLinks from "@/components/footer-links";
import FooterLinkItem from "@/components/footer-link-item";
import Header from "@/components/header";
import TwoToneBackground from "@/components/two-tone-background";
import ColorPreview from "@/components/color-preview";
// shadcn/ui components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Tailwind-enhanced base tags
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1
        className="font-sans text-6xl font-bold tracking-tight scroll-m-20"
        {...props}
      />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2
        className="text-3xl font-semibold tracking-tight scroll-m-20"
        {...props}
      />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3
        className="text-2xl font-semibold tracking-tight scroll-m-20"
        {...props}
      />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />
    ),
    a: (props: React.HTMLAttributes<HTMLAnchorElement>) => (
      <a
        className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
        {...props}
      />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
    ),
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
      <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />
    ),
    blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
      <blockquote
        className="mt-6 border-l-2 pl-6 italic text-muted-foreground"
        {...props}
      />
    ),
    code: (props: React.HTMLAttributes<HTMLElement>) => (
      <code
        className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
        {...props}
      />
    ),
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
      <pre
        className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4 px-4 text-sm text-white"
        {...props}
      />
    ),
    // Custom components
    TwoToneBackground,
    ColorPreview,
    AllImages,
    Header,
    FooterLinks,
    FooterLinkItem,
    // shadcn/ui components
    Alert,
    AlertTitle,
    AlertDescription,
    Badge,
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    Image,
    Link,
    ...components,
  };
}

export default useMDXComponents;
