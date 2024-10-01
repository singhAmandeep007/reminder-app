import { Meta, StoryObj } from "@storybook/react";

import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

import { cn } from "shared";

import { Calendar } from "./Calendar";
import { buttonVariants } from "./Button";

// this default export determines where your story goes in the story list
const meta: Meta<typeof Calendar> = {
  component: Calendar,
  title: "Components/Calendar",
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export default meta;

type TStory = StoryObj<typeof Calendar>;

export const Default: TStory = {
  args: {},
};

export const WithoutOutsideDays: TStory = {
  args: {
    showOutsideDays: false,
  },
};

export const WithCustomization: TStory = {
  args: {
    components: {
      IconLeft: ({ ...props }) => <ArrowBigLeft className="h-4 w-4" />,
      IconRight: ({ ...props }) => <ArrowBigRight className="h-4 w-4" />,
    },
    classNames: {
      day: "rounded-full border-2 border-transparent hover:border-primary",
      nav_button: cn(
        buttonVariants({ variant: "outline" }),
        "hover:bg-primary hover:text-primary-foreground h-7 w-7 p-0 "
      ),
    },
  },
};
