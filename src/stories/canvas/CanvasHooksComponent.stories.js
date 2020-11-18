import React from "react";

import { CanvasHooksComponent } from "./CanvasHooksComponent";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Canvas Hooks",
  component: CanvasHooksComponent,
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

const Template = (args) => <CanvasHooksComponent {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  width: 500,
  height: 500,
  label: "Canvas",
};
