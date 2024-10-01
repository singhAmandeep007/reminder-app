import { Meta, StoryObj } from "@storybook/react";

import { ValueSetter } from "./ValueSetter";

// this default export determines where your story goes in the story list
const meta: Meta<typeof ValueSetter> = {
  component: ValueSetter,
  title: "Components/ValueSetter",
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export default meta;

type TStory = StoryObj<typeof ValueSetter>;

export const Default: TStory = {
  args: {},
};
