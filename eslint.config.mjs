// eslint.config.mjs
import js from "@eslint/js";
import eslintPluginTypescript from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier/recommended";
import eslintPluginAutofix from "eslint-plugin-autofix";
import eslintPluginImport from "eslint-plugin-import";
import typescriptParser from "@typescript-eslint/parser";
import eslintNodePlugin from "eslint-plugin-node";
import eslintPluginNext from "@next/eslint-plugin-next";

export default [
  {
    // Ignore specific directories
    ignores: [
      "**/.next/",
      "node_modules/**",
      "dist/**",
      "tmp/**",
      "coverage/**",
      "tina/__generated__/**",
      // 'jest.config.ts',
    ],
  },
  {
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: true,
      },
      globals: {
        console: "readonly",
        process: "readonly",
        React: "readonly",
        JSX: "readonly",
        atob: "readonly",
        btoa: "readonly",
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  {
    files: ["**/*.mjs"],
    languageOptions: {
      parserOptions: {
        project: null, // ✅ Prevents TypeScript type checking in `.mjs` files
      },
    },
  },
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      sourceType: "script", // ✅ Use CommonJS instead of ES modules
      parserOptions: { project: null }, // Disable project for JavaScript files
      globals: {
        require: "readonly", // ✅ Allow require()
        module: "readonly", // ✅ Allow module.exports
        __dirname: "readonly", // ✅ Allow __dirname
      },
    },
  },
  js.configs.recommended, // ESLint recommended rules for JavaScript
  {
    files: ["*.js", "*.jsx"],
    ...eslintNodePlugin.configs["flat/typescript"],
  },
  {
    files: ["*.ts", "*.tsx"],
    ...eslintNodePlugin.configs["flat/typescript"],
  },
  {
    settings: {
      "import/resolver": {
        typescript: {}, // Enable TypeScript resolution
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/*.mjs"],
    plugins: {
      import: eslintPluginImport,
      autofix: eslintPluginAutofix,
      "@typescript-eslint": eslintPluginTypescript,
      "@next/next": eslintPluginNext,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^_", // Ignore variables that start with '_'
          argsIgnorePattern: "^_", // Ignore function arguments that start with '_'
          ignoreRestSiblings: true, // Ignore unused rest properties
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "no-console": "off", // Adjust based on environment if needed
      "prettier/prettier": "warn",
      "@typescript-eslint/no-useless-constructor": "off",
      "@typescript-eslint/no-empty-function": "off",
      // Next.js rules
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs["core-web-vitals"].rules,
    },
  },
  {
    files: [
      "postcss.config.js",
      "tailwind.config.js",
      "delete_test_data.js",
      "next.config.js",
      "*.js",
    ],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  {
    files: ["*.cjs"],
    languageOptions: {
      sourceType: "script", // ✅ Treat `.cjs` as CommonJS
      parserOptions: {
        project: null, // ✅ Prevents TypeScript type checking for `.cjs` files
      },
      globals: {
        module: "readonly", // ✅ Prevents ESLint from flagging `module` as undefined
        require: "readonly", // ✅ Allow `require()`
      },
    },
  },
  // TypeScript and JavaScript overrides
  {
    files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
    rules: {
      "no-unused-vars": "error",
      "no-debugger": "error",
    },
  },
  {
    files: ["*.spec.ts", "*.spec.tsx", "*.spec.js", "*.spec.jsx"],
    languageOptions: {
      env: {
        jest: true,
      },
    },
    rules: {},
  },
  prettier, // Prettier integration
];
