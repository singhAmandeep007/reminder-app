module.exports = {
  // https://github.com/facebook/create-react-app/issues/12070
  parserOptions: {
    babelOptions: { presets: [["babel-preset-react-app", false]] },
  },

  extends: [
    // https://github.com/facebook/create-react-app/blob/main/packages/eslint-config-react-app/README.md
    "react-app",
    "react-app/jest",
    // NOTE: Enables ALL rules that are recommended. Uncomment to enable.

    // Enables few key rules in [ESLint](https://eslint.org/docs/rules/) rule book.
    // "eslint:recommended",

    // Enables rules for import/export syntax in [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)
    "plugin:import/recommended",
    "plugin:import/typescript",

    // Enables the [recommended](https://www.npmjs.com/package/eslint-plugin-react#recommended) React rule set in [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react).
    // "plugin:react/recommended",

    // Enables the recommended accessibility rules in [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y).
    // "plugin:jsx-a11y/recommended",

    // Enables React Hooks best practices rule set in [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
    // "plugin:react-hooks/recommended",

    // Enables recommended rules in [eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest)
    // "plugin:jest/recommended",

    // Enables recommended settings in [eslint-plugin-testing-library](https://www.npmjs.com/package/eslint-plugin-testing-library)
    // "plugin:testing-library/react",

    // "plugin:storybook/recommended",

    "prettier",
  ],

  settings: {
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },

  rules: {
    // [import/order rules](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md)
    "import/order": [
      // This sets the rule to a warning level, meaning ESLint will report the violations as warnings but won't fail the build.
      "warn",
      {
        // This sub-option controls the order of import specifiers when alphabetizing.
        alphabetize: {
          // ensures that the sorting is case-insensitive.
          caseInsensitive: true,
          // specifies the sort order as ascending.
          order: "ignore",
        },
        // defines the order of import groups
        groups: [
          // Node.js built-in modules.
          "builtin",
          // External modules (i.e., third-party libraries installed via npm)
          "external",
          // Files within the same project but not in the same or parent directory.
          "internal",
          // Files in the parent directory.
          "parent",
          // Other files in the same directory.
          "sibling",
          // index file of the current directory.
          "index",
        ],
        warnOnUnassignedImports: true,
        "newlines-between": "always-and-inside-groups",
      },
    ],

    "import/no-duplicates": "error",

    // READ-MORE: https://typescript-eslint.io/rules/consistent-type-definitions
    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    // typeAlias selectors should start with prefix T
    // READ-MORE: https://typescript-eslint.io/rules/naming-convention
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: ["typeAlias"],
        format: ["PascalCase"],
        custom: {
          regex: "^T[A-Z]",
          match: true,
        },
      },
    ],

    "no-console": "warn",
  },
  ignorePatterns: ["/build/", "/public/", "/node_modules/", ".eslintrc.js", "/config"],
};
