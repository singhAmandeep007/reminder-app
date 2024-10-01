import type { StorybookConfig } from "@storybook/react-webpack5";

import configFactory from "../config/webpack.config";

import { mergeUniqueArrays } from "../utils";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  webpackFinal: async (config, { configType }) => {
    const customWebpackConfig = configFactory(configType?.toLocaleLowerCase() || "development");

    if (configType === "DEVELOPMENT") {
      // Modify config for development
    }
    if (configType === "PRODUCTION") {
      // Modify config for production
    }

    if (config.resolve) {
      if (config.resolve.modules)
        config.resolve.modules = mergeUniqueArrays(config.resolve.modules, customWebpackConfig.resolve.modules);

      if (config.resolve.extensions)
        config.resolve.extensions = mergeUniqueArrays(
          config.resolve.extensions,
          customWebpackConfig.resolve.extensions
        );
    }

    if (config.module?.rules) {
      config.module.rules.push({
        test: /\.css$/,
        use: [
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("tailwindcss")],
              },
            },
          },
        ],
      });
    }

    return config;
  },
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-styling-webpack",
    "@storybook/addon-themes",
    "@storybook/addon-a11y",
    "@storybook/addon-webpack5-compiler-babel",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  staticDirs: ["../public"],
  docs: {},
};
export default config;
