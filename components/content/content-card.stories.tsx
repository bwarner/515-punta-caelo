import type { Meta, StoryObj } from "@storybook/react";
import { ContentCard } from "./content-card";

const meta: Meta<typeof ContentCard> = {
  title: "Content/ContentCard",
  component: ContentCard,
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
type Story = StoryObj<typeof ContentCard>;

export const WithImageAndList: Story = {
  args: {
    image: "/images/515-punta-caelo/kitchen_view1.jpg",
    imageAlt: "Kitchen",
    title: "Kitchen",
    children: (
      <ul className="space-y-1">
        <li className="flex items-center gap-2">
          <span className="text-primary">•</span> Gas range cooker
        </li>
        <li className="flex items-center gap-2">
          <span className="text-primary">•</span> Electric oven
        </li>
        <li className="flex items-center gap-2">
          <span className="text-primary">•</span> Fridge
        </li>
        <li className="flex items-center gap-2">
          <span className="text-primary">•</span> Microwave
        </li>
      </ul>
    ),
  },
};

export const TitleOnly: Story = {
  args: {
    title: "Flexibility",
    children: null,
  },
};

export const WithText: Story = {
  args: {
    title: "Gate Procedure",
    children: (
      <p>
        At the main entrance, please notify the security guard that you are
        heading to Apartment 515. Access will be granted via an app approval
        from the host.
      </p>
    ),
  },
};

export const NoImageNoTitle: Story = {
  args: {
    children: (
      <p className="text-center font-medium">
        Don't see something you need? Please contact us and if it's something we
        have, we'll let you know.
      </p>
    ),
  },
};
