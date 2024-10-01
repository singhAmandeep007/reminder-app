import type { Meta, StoryObj } from "@storybook/react";

import { Typography } from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "Components/Typography",
  component: Typography,
  argTypes: {
    variant: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "blockquote", "ul", "inlineCode"],
    },
    affects: {
      control: "select",
      options: ["default", "lead", "large", "small", "muted", "withoutPMargin"],
    },
  },
};

export default meta;
type TStory = StoryObj<typeof Typography>;

export const Default: TStory = {
  args: {
    children: "Typography Example",
    variant: "h1",
    affects: "default",
  },
};

// Stories for each variant
export const Heading1: TStory = {
  args: {
    children: "Heading 1",
    variant: "h1",
  },
};

export const Heading2: TStory = {
  args: {
    children: "Heading 2",
    variant: "h2",
  },
};

export const Heading3: TStory = {
  args: {
    children: "Heading 3",
    variant: "h3",
  },
};

export const Paragraph: TStory = {
  args: {
    children: "This is a paragraph of text. It demonstrates the paragraph styling of the Typography component.",
    variant: "p",
  },
};

export const Blockquote: TStory = {
  args: {
    children: "This is a blockquote. It can be used to highlight important text or quotations.",
    variant: "blockquote",
  },
};

export const UnorderedList: TStory = {
  args: {
    children: (
      <>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </>
    ),
    variant: "ul",
  },
};

export const InlineCode: TStory = {
  args: {
    children: 'const example = "This is inline code";',
    variant: "inlineCode",
  },
};

export const LeadText: TStory = {
  args: {
    children: "This is lead text, typically used for introductory paragraphs.",
    variant: "p",
    affects: "lead",
  },
};

export const LargeText: TStory = {
  args: {
    children: "This is large text, useful for emphasis.",
    variant: "p",
    affects: "large",
  },
};

export const SmallText: TStory = {
  args: {
    children: "This is small text, often used for captions or annotations.",
    variant: "p",
    affects: "small",
  },
};

export const MutedText: TStory = {
  args: {
    children: "This is muted text, less prominent than regular text.",
    variant: "p",
    affects: "muted",
  },
};

export const WithoutParagraphMargin: TStory = {
  args: {
    children: "This paragraph has no top margin when not the first child.",
    variant: "p",
    affects: "withoutPMargin",
  },
};

export const CombinedExample: TStory = {
  args: {
    children: "This is a large heading with muted color",
    variant: "h2",
    affects: "muted",
  },
};

export const CustomClassName: TStory = {
  args: {
    children: "This has a custom class applied",
    variant: "p",
    className: "bg-gray-200 p-4 rounded",
  },
};
