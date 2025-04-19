import type { MDXComponents } from "mdx/types";
import AllImages from "@/components/all-images";

// Import core shadcn/ui components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // custom components
    AllImages,

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

    // allow other component overrides to extend
    ...components,
  };
}

export default useMDXComponents;
