import type { Meta, StoryObj } from "@storybook/react-vite";

import { CommentsViewer } from "../components/comments/comments-viewer";
import { TooltipProvider } from "ui/components/tooltip";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Particles/CommentsViewer",
  component: CommentsViewer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof CommentsViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
