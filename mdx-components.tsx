import type { MDXComponents } from "mdx/types";

// Custom components
import AllImages from "@/components/all-images";
import FooterLinks from "@/components/footer-links";
import FooterLinkItem from "@/components/footer-link-item";
import Header from "@/components/header";
import TwoToneBackground from "@/components/two-tone-background";
import ColorPreview from "@/components/color-preview";
import IconWithText from "@/components/icon-with-text";
import SplitSection from "@/components/split-section";
import LeftImageSplitSection from "@/components/left-image-split-section";
import WiFiQRCode from "@/components/wifi-qr-code";
import AltBackground from "@/components/alt-background";
import GuideGrid from "@/components/guide-grid";
import Menubar from "@/components/menubar";
import WiFiPanel from "@/components/wifi.panel";
// shadcn/ui components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Plane } from "lucide-react";
import { HTMLAttributes } from "react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Tailwind-enhanced base tags
    h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
      <h1
        className="wrapper tracking-tight scroll-m-20 font-montserrat font-light text-4xl md:text-6xl"
        data-center={props.className?.includes("text-center")}
        {...props}
      />
    ),
    h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
      <h2
        className="wrapper capitalize py-2 text-3xl tracking-tight scroll-m-20"
        {...props}
      />
    ),
    h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
      <h3
        className="wrapper text-2xl font-semibold tracking-tight scroll-m-20"
        {...props}
      />
    ),
    p: (props: HTMLAttributes<HTMLParagraphElement>) => (
      <p
        className="wrapper text-justify leading-7 [&:not(:first-child)]:mt-6"
        {...props}
      />
    ),
    a: (props: HTMLAttributes<HTMLAnchorElement>) => (
      <a
        className="font-medium text-roboto-slab hover:text-primary/80"
        {...props}
      />
    ),
    ul: (props: HTMLAttributes<HTMLUListElement>) => (
      <ul className="my-6 list-none [&>li]:mt-2" {...props} />
    ),
    ol: (props: HTMLAttributes<HTMLOListElement>) => (
      <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />
    ),
    blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
      <blockquote
        className="mt-6 border-l-2 pl-6 italic text-muted-foreground"
        {...props}
      />
    ),
    code: (props: HTMLAttributes<HTMLElement>) => (
      <code
        className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
        {...props}
      />
    ),
    pre: (props: HTMLAttributes<HTMLPreElement>) => (
      <pre
        className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4 px-4 text-sm text-white"
        {...props}
      />
    ),
    // Custom components
    TwoToneBackground,
    GuideGrid,
    AltBackground,
    ColorPreview,
    AllImages,
    Header,
    FooterLinks,
    FooterLinkItem,
    IconWithText,
    SplitSection,
    LeftImageSplitSection,
    WiFiQRCode,
    Menubar,
    WiFiPanel,
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
    // lucide-react icons
    Phone,
    Mail,
    Plane,
    ...components,
  };
}

export default useMDXComponents;
