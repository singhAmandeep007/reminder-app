import type { Preview } from "@storybook/react";

import { withThemeByClassName } from "@storybook/addon-themes";

import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ["autodocs"],
};

export default preview;

/* snipped for brevity */
export const decorators = [
  withThemeByClassName({
    themes: {
      // nameOfTheme: 'classNameForTheme',
      light: "light",
      dark: "dark",
    },
    defaultTheme: "light",
  }),
];
