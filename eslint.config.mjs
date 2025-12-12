// eslint.config.mjs
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default [
  eslint.configs.recommended,

  ...tseslint.configs.recommendedTypeChecked,
  prettier,
  {
    files: ["**/*.{ts,tsx,js,mjs,cjs}"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json"
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },

    ignores: [
      "dist/**",
      "node_modules/**",
      "*.config.js",
      "*.config.mjs"
    ],

    rules: {
      // JS rules
      curly: ["error", "all"],
      eqeqeq: ["error", "always"],

      // Replace base rules with TS ones
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],

      // TS strict-ish vibes
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": "error",

      // Prettier-aligned stuff
      quotes: ["error", "single"],
      semi: ["error", "always"],
      indent: ["error", 4]
    }
  }
];
