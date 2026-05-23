import type { Meta, StoryObj } from "@storybook/react-vite";

import { CommentThread } from "../components/comments/comment-thread";
import { TooltipProvider } from "ui/components/tooltip";
import { MOCK_COMMENTS } from "ui/components/comments/constants";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Particles/CommentThread",
  component: CommentThread,
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
} satisfies Meta<typeof CommentThread>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    comment:MOCK_COMMENTS[0],
    "onDelete": () => {},
    "onEdit": () => {},
    "onReact": () => {},
    "onReply": () => {}
  },
};
