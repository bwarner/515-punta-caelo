import type { Meta, StoryObj } from "@storybook/react";
import { CalloutBox } from "./callout-box";

const meta: Meta<typeof CalloutBox> = {
  title: "Content/CalloutBox",
  component: CalloutBox,
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
type Story = StoryObj<typeof CalloutBox>;

export const Default: Story = {
  args: {
    children:
      "Thank you for helping us keep a safe and pleasant space for everyone!",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children:
      "Ask us for our current favorite recommendations - the food scene is always evolving!",
  },
};

export const WithPriceGuide: Story = {
  args: {
    children: (
      <>
        <span className="block font-medium mb-2">Price Guide</span>
        <span className="block text-sm">
          $ = Under $10 • $$ = $10-25 • $$$ = $25+
        </span>
      </>
    ),
  },
};

export const LeftAligned: Story = {
  args: {
    centered: false,
    children: "Contact us directly for any non-emergency assistance.",
  },
};
