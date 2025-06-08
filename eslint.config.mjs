import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import sonarjsPlugin from "eslint-plugin-sonarjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // ベースの設定 + 推奨ルール拡張
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:sonarjs/recommended",
    "plugin:prettier/recommended"
  ),

  // プラグイン登録
  {
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
      "jsx-a11y": jsxA11yPlugin,
      sonarjs: sonarjsPlugin,
    },
  },

  // 共通ルール
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // エラー防止
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": "off", // 無効化してTypeScript版を使う
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-duplicate-imports": "error",

      // コードスタイル
      "semi": ["error", "always"],
      "quotes": ["error", "single", { avoidEscape: true }],
      "comma-dangle": ["error", "always-multiline"],
      "arrow-parens": ["error", "always"],

      // React
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-pascal-case": "error",

      // TypeScript
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",

      // import
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
        },
      ],
      "import/no-unresolved": "error",

      // prettier
      "prettier/prettier": "error",
    },
  },

  // テスト用ルール
  {
    files: ["**/*.test.{js,jsx,ts,tsx}", "**/*.spec.{js,jsx,ts,tsx}"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
