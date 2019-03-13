import React from "react";
import { mount } from "enzyme";
import RadioButtonField from ".";
import _ from "lodash";

describe("RadioButtonField", () => {
  let options = [
    { value: "1", displayValue: "One", checked: false },
    { value: "2", displayValue: "Two", checked: false },
    { value: "3", displayValue: "Three", checked: false },
    { value: "4", displayValue: "Four", checked: false },
    { value: "5", displayValue: "Five", checked: false }
  ];

  let changedValueOption = { value: "1", displayValue: "One", checked: true };
  let expectedValueOption = ["1"];
  let onValueChange = (field, value) => {
    expect(field).toEqual(props.field);
    expect(value).toEqual(expectedValueOption);
  };

  let props = {
    name: "RadioButton name",
    onValueChange: onValueChange,
    value: ["1"],
    field: "field",
    multiSelect: true,
    options: options
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<RadioButtonField {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("on change event handler should have field and value as parameter", () => {
    wrapper
      .find("input")
      .first()
      .simulate("change", {
        target: changedValueOption
      });
  });
});
