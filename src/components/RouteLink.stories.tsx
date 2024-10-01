import { Meta, StoryObj } from "@storybook/react";

import { MemoryRouter, Routes, Route, MemoryRouterProps } from "react-router-dom";

import { RouteLink } from "./RouteLink";

// this default export determines where your story goes in the story list
const meta: Meta<typeof RouteLink> = {
  title: "Components/RouteLink",
  component: RouteLink,
  decorators: [
    (Story, context) => {
      const { parameters } = context;
      return (
        <MemoryRouter initialEntries={parameters.initialEntries}>
          <Story />
          <Routes>
            <Route
              path="/"
              element={<div>Home Content</div>}
            />
            <Route
              path="/about"
              element={<div>About Content</div>}
            />
          </Routes>
        </MemoryRouter>
      );
    },
  ],

  argTypes: {}, //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  parameters: {
    initialEntries: [{ pathname: "/" }] as MemoryRouterProps["initialEntries"],
  },
};

export default meta;

type TStory = StoryObj<typeof RouteLink>;

export const Default: TStory = {
  args: {
    to: "/",
    children: "Home Link",
  },
};

export const ActiveLink: TStory = {
  args: {
    to: "/about",
    children: ({ isActive }) => <span style={{ color: isActive ? "green" : "red" }}>About Link</span>,
  },
  parameters: {
    initialEntries: [{ pathname: "/about" }],
  },
};

export const InactiveLink: TStory = {
  args: {
    to: "/about",
    children: ({ isActive }) => <span style={{ color: isActive ? "green" : "red" }}>About Link</span>,
  },
  parameters: {
    initialEntries: [{ pathname: "/" }],
  },
};
