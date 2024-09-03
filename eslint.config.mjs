import globals from "globals";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import js from "@eslint/js";

/** @type {import('eslint').FlatConfig[]} */
const config = [
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      react: reactPlugin, // Include the react plugin
      prettier: prettierPlugin,
    },
    rules: {
      // Base rules
      "no-console": "off",
      "@typescript-eslint/adjacent-overload-signatures": "error",
      "@typescript-eslint/array-type": "error",
      "no-var": "error",
      "react/self-closing-comp": "error",
      "prettier/prettier": "error", // Integrate Prettier rules
      // eslint-disable-next-line no-dupe-keys
      "no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
    ignores: ["node_modules", "dist"],
  },
  prettierConfig,
  js.configs.recommended,
];

export default config;
