import type { Meta, StoryObj } from "@storybook/react";
import { MapEmbed } from "./map-embed";

const meta: Meta<typeof MapEmbed> = {
  title: "Content/MapEmbed",
  component: MapEmbed,
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
type Story = StoryObj<typeof MapEmbed>;

export const PuntaCaelo: Story = {
  args: {
    lat: 8.4487,
    lng: -79.9475,
    title: "Punta Caelo map",
  },
};
