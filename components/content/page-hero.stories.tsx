import type { Meta, StoryObj } from "@storybook/react";
import { PageHero } from "./page-hero";

const meta: Meta<typeof PageHero> = {
  title: "Content/PageHero",
  component: PageHero,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "375px", backgroundColor: "#f5f0eb" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PageHero>;

export const Default: Story = {
  args: {
    image: "/images/515-punta-caelo/doorway_mobile.jpg",
    imageAlt: "Entrance",
    title: "Check-in/out",
  },
};

export const WithSubtitle: Story = {
  args: {
    image: "/images/515-punta-caelo/livingroom_view1.jpg",
    imageAlt: "Living room",
    title: "Amenities",
    subtitle: "What We Provide",
  },
};

export const BeachImage: Story = {
  args: {
    image: "/images/515-punta-caelo/beach_mobile.jpg",
    imageAlt: "Beach view",
    title: "Location",
  },
};
