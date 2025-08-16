import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import reactCompiler from "eslint-plugin-react-compiler";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  // Global ignores for Next.js
  { ignores: ["dist", "coverage", ".next"] },

  // Bring in Next.js recommended + TypeScript defaults
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    files: ["**/*.{ts,tsx,js,jsx}"], // cover both JS and TS in Next.js
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node, // Next.js runs on both client + server
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "react-compiler": reactCompiler,
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict, // stricter TS linting than Next defaults
      eslintPluginPrettier,       // Prettier formatting
    ],
    rules: {
      // React core rules
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,

      // Hooks rules
      ...reactHooks.configs.recommended.rules,

      // Next.js Fast Refresh safeguard
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // React Compiler experimental rules
      "react-compiler/react-compiler": "error",

      // You can still override Next’s stricter rules if they clash with your style
      // Example: disable Next’s restriction on `next/script`
      // "@next/next/no-sync-scripts": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  }
); 