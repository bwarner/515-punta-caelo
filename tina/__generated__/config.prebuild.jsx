// tina/config.ts
import { defineConfig } from "tinacms";
var branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";
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
            templates: [
              {
                name: "Menubar",
                label: "Menubar",
                fields: [
                  {
                    name: "locale",
                    label: "Locale",
                    type: "string",
                  },
                  {
                    name: "title",
                    label: "Title",
                    type: "string",
                  },
                ],
              },
              {
                name: "Image",
                label: "Image",
                fields: [
                  {
                    name: "src",
                    label: "Source",
                    type: "image",
                  },
                  {
                    name: "alt",
                    label: "Alt Text",
                    type: "string",
                  },
                  {
                    name: "fill",
                    label: "Fill",
                    type: "boolean",
                  },
                  {
                    name: "className",
                    label: "CSS Class",
                    type: "string",
                  },
                ],
              },
              {
                name: "Alert",
                label: "Alert",
                fields: [
                  {
                    name: "children",
                    label: "Content",
                    type: "rich-text",
                  },
                ],
              },
              {
                name: "Card",
                label: "Card",
                fields: [
                  {
                    name: "children",
                    label: "Content",
                    type: "rich-text",
                  },
                ],
              },
              {
                name: "TrackedAirbnbButton",
                label: "Airbnb Button",
                fields: [
                  {
                    name: "href",
                    label: "URL",
                    type: "string",
                  },
                  {
                    name: "label",
                    label: "Label",
                    type: "string",
                  },
                ],
              },
            ],
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
            templates: [
              {
                name: "Menubar",
                label: "Menubar",
                fields: [
                  {
                    name: "locale",
                    label: "Locale",
                    type: "string",
                  },
                  {
                    name: "title",
                    label: "Title",
                    type: "string",
                  },
                ],
              },
              {
                name: "Image",
                label: "Image",
                fields: [
                  {
                    name: "src",
                    label: "Source",
                    type: "image",
                  },
                  {
                    name: "alt",
                    label: "Alt Text",
                    type: "string",
                  },
                  {
                    name: "fill",
                    label: "Fill",
                    type: "boolean",
                  },
                  {
                    name: "className",
                    label: "CSS Class",
                    type: "string",
                  },
                ],
              },
              {
                name: "Alert",
                label: "Alerta",
                fields: [
                  {
                    name: "children",
                    label: "Contenido",
                    type: "rich-text",
                  },
                ],
              },
              {
                name: "Card",
                label: "Tarjeta",
                fields: [
                  {
                    name: "children",
                    label: "Contenido",
                    type: "rich-text",
                  },
                ],
              },
              {
                name: "TrackedAirbnbButton",
                label: "Bot\xF3n de Airbnb",
                fields: [
                  {
                    name: "href",
                    label: "URL",
                    type: "string",
                  },
                  {
                    name: "label",
                    label: "Etiqueta",
                    type: "string",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
export { config_default as default };
