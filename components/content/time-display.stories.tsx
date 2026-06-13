import type { Meta, StoryObj } from "@storybook/react";
import { TimeDisplay } from "./time-display";

const meta: Meta<typeof TimeDisplay> = {
  title: "Content/TimeDisplay",
  component: TimeDisplay,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "tan",
      values: [{ name: "tan", value: "#f5f0eb" }],
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "375px", padding: "16px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TimeDisplay>;

export const CheckIn: Story = {
  args: {
    time: "3 PM",
    label: "Check-in",
  },
};

export const CheckOut: Story = {
  args: {
    time: "11 AM",
    label: "Check-out",
  },
};
