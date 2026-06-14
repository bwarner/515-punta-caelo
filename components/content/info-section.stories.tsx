import type { Meta, StoryObj } from "@storybook/react";
import { InfoSection } from "./info-section";

const meta: Meta<typeof InfoSection> = {
  title: "Content/InfoSection",
  component: InfoSection,
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
type Story = StoryObj<typeof InfoSection>;

export const GateProcedure: Story = {
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

export const WithMultipleParagraphs: Story = {
  args: {
    title: "Early/Late Access",
    children: (
      <>
        <p>
          We aim to be flexible with check-in and check-out times. If there are
          no guests arriving or departing on the same day, we are happy to
          accommodate earlier arrivals or later departures.
        </p>
        <p>Please contact us 24 hours in advance to check availability.</p>
      </>
    ),
  },
};
