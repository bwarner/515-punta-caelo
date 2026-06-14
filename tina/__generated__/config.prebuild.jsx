// tina/config.ts
import { defineConfig } from "tinacms";
var branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";
var contentTemplates = [
  {
    name: "Menubar",
    label: "Menubar",
    fields: [
      { name: "locale", label: "Locale", type: "string" },
      { name: "title", label: "Title", type: "string" },
    ],
  },
  {
    name: "Image",
    label: "Image",
    fields: [
      { name: "src", label: "Source", type: "image" },
      { name: "alt", label: "Alt Text", type: "string" },
      { name: "fill", label: "Fill", type: "boolean" },
      { name: "className", label: "CSS Class", type: "string" },
    ],
  },
  {
    name: "Alert",
    label: "Alert",
    fields: [{ name: "children", label: "Content", type: "rich-text" }],
  },
  {
    name: "Card",
    label: "Card",
    fields: [{ name: "children", label: "Content", type: "rich-text" }],
  },
  {
    name: "TrackedAirbnbButton",
    label: "Airbnb Button",
    fields: [
      { name: "href", label: "URL", type: "string" },
      { name: "label", label: "Label", type: "string" },
    ],
  },
  // Content wrapper components
  {
    name: "PageHero",
    label: "Page Hero",
    fields: [
      { name: "image", label: "Hero Image", type: "image", required: true },
      {
        name: "imageAlt",
        label: "Image Alt Text",
        type: "string",
        required: true,
      },
      { name: "title", label: "Page Title", type: "string", required: true },
      { name: "subtitle", label: "Subtitle", type: "string" },
    ],
  },
  {
    name: "ContentCard",
    label: "Content Card",
    fields: [
      { name: "image", label: "Header Image", type: "image" },
      { name: "imageAlt", label: "Image Alt Text", type: "string" },
      { name: "title", label: "Card Title", type: "string" },
      { name: "children", label: "Card Content", type: "rich-text" },
      { name: "className", label: "CSS Class", type: "string" },
    ],
  },
  {
    name: "TimeDisplay",
    label: "Time Display",
    fields: [
      { name: "time", label: "Time", type: "string", required: true },
      { name: "label", label: "Label", type: "string", required: true },
    ],
  },
  {
    name: "CalloutBox",
    label: "Callout Box",
    fields: [
      {
        name: "variant",
        label: "Variant",
        type: "string",
        options: ["default", "info"],
      },
      { name: "centered", label: "Centered Text", type: "boolean" },
      { name: "children", label: "Content", type: "rich-text" },
    ],
  },
  {
    name: "InfoSection",
    label: "Info Section",
    fields: [
      { name: "title", label: "Section Title", type: "string", required: true },
      { name: "children", label: "Content", type: "rich-text" },
    ],
  },
  {
    name: "AmenityList",
    label: "Amenity List",
    fields: [
      {
        name: "items",
        label: "Amenities",
        type: "string",
        list: true,
        required: true,
      },
    ],
  },
  {
    name: "MapEmbed",
    label: "Map Embed",
    fields: [
      { name: "lat", label: "Latitude", type: "number", required: true },
      { name: "lng", label: "Longitude", type: "number", required: true },
      { name: "title", label: "Map Title", type: "string" },
      { name: "zoom", label: "Zoom Level", type: "number" },
    ],
  },
  // Page wrapper components
  {
    name: "AltBackground",
    label: "Alt Background (Dark Mode)",
    fields: [
      { name: "title", label: "Page Title", type: "string" },
      { name: "description", label: "Description", type: "string" },
      { name: "darkBackground", label: "Dark Background", type: "boolean" },
      { name: "locale", label: "Locale", type: "string" },
      { name: "children", label: "Page Content", type: "rich-text" },
    ],
  },
  // Layout wrapper components
  {
    name: "Section",
    label: "Section",
    fields: [
      {
        name: "layout",
        label: "Layout",
        type: "string",
        options: ["stack", "flex-row", "grid-2", "grid-3", "centered"],
      },
      {
        name: "spacing",
        label: "Spacing",
        type: "string",
        options: ["none", "sm", "md", "lg"],
      },
      {
        name: "padding",
        label: "Padding",
        type: "string",
        options: ["none", "sm", "md", "lg"],
      },
      { name: "className", label: "Custom CSS Class", type: "string" },
      { name: "children", label: "Content", type: "rich-text" },
    ],
  },
  {
    name: "ImageGrid",
    label: "Image Grid",
    fields: [
      {
        name: "columns",
        label: "Columns",
        type: "number",
        required: true,
      },
      {
        name: "gap",
        label: "Gap Size",
        type: "string",
        options: ["sm", "md", "lg"],
      },
      { name: "children", label: "Images", type: "rich-text" },
    ],
  },
  {
    name: "FlexRow",
    label: "Flex Row",
    fields: [
      {
        name: "justify",
        label: "Justify",
        type: "string",
        options: ["start", "center", "end", "between", "around"],
      },
      {
        name: "align",
        label: "Align",
        type: "string",
        options: ["start", "center", "end", "stretch"],
      },
      {
        name: "gap",
        label: "Gap",
        type: "string",
        options: ["sm", "md", "lg"],
      },
      { name: "children", label: "Content", type: "rich-text" },
    ],
  },
];
var config_default = defineConfig({
  branch,
  // Get these from tina.io after creating a project
  // See: https://tina.io/docs/tina-cloud/overview/
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "pages_en",
        label: "Pages (English)",
        path: "content",
        format: "mdx",
        match: {
          include: "*-en",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
            isTitle: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "string",
            name: "locale",
            label: "Locale",
            options: ["en", "es"],
          },
          {
            type: "boolean",
            name: "darkBackground",
            label: "Dark Background",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: contentTemplates,
          },
        ],
      },
      {
        name: "pages_es",
        label: "Pages (Spanish)",
        path: "content",
        format: "mdx",
        match: {
          include: "*-es",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "T\xEDtulo",
            required: true,
            isTitle: true,
          },
          {
            type: "string",
            name: "description",
            label: "Descripci\xF3n",
          },
          {
            type: "string",
            name: "locale",
            label: "Locale",
            options: ["en", "es"],
          },
          {
            type: "boolean",
            name: "darkBackground",
            label: "Fondo Oscuro",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Contenido",
            isBody: true,
            templates: contentTemplates,
          },
        ],
      },
    ],
  },
});
export { config_default as default };
