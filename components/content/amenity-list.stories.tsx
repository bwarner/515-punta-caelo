import type { Meta, StoryObj } from "@storybook/react";
import { AmenityList } from "./amenity-list";

const meta: Meta<typeof AmenityList> = {
  title: "Content/AmenityList",
  component: AmenityList,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
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
type Story = StoryObj<typeof AmenityList>;

export const Kitchen: Story = {
  args: {
    items: [
      "Gas range cooker",
      "Electric oven",
      "Fridge",
      "Microwave",
      "Dishwasher",
      "Coffee machine & kettle",
      "Glassware, cups & cutlery",
      "Cooking accessories & utensils",
    ],
  },
};

export const Bedroom: Story = {
  args: {
    items: [
      "3 bedrooms with quality linens",
      "Air conditioning & ceiling fans",
      "Smart TVs with IPTV (live channels available)",
      "Extra towels & blankets",
      "Hairdryer",
      "Shampoo & body wash",
    ],
  },
};
