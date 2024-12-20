import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: [
      "framework/*.js",
      "src/*.js",
    ],
    ignores: [".parcel-cache/", "dist/", "dist/*", "node_modules/"],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    }
  },
  pluginJs.configs.recommended,
];