import React from "react";

import { CanvasClassComponent } from "./CanvasClassComponent";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Canvas Class",
  component: CanvasClassComponent,
  argTypes: {
    color: { control: "color" },
    width: {
      control: { type: "range", min: 0, max: 1000, step: 1 },
    },
    height: {
      control: { type: "range", min: 0, max: 1000, step: 1 },
    },
  },
};

const Template = (args) => <CanvasClassComponent {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  width: 500,
  height: 500,
  label: "Canvas",
};
