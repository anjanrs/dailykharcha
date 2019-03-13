import React from "react";
import { mount } from "enzyme";
import CheckBoxField from ".";
import _ from "lodash";

describe("CheckBoxField", () => {
  let options = [
    { value: "1", displayValue: "One", checked: false },
    { value: "2", displayValue: "Two", checked: false },
    { value: "3", displayValue: "Three", checked: false },
    { value: "4", displayValue: "Four", checked: false },
    { value: "5", displayValue: "Five", checked: false }
  ];

  let changedValueOption = { value: "2", displayValue: "Four", checked: false };
  let expectedValueOption = ["1"];
  let onValueChange = (field, value) => {
    expect(field).toEqual(props.field);
    expect(value).toEqual(expectedValueOption);
  };

  let props = {
    name: "CheckBox name",
    onValueChange: onValueChange,
    value: ["1", "2"],
    field: "field",
    multiSelect: true,
    options: options
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<CheckBoxField {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("on change event handler should field and value as parameter", () => {
    wrapper
      .find("input")
      .first()
      .simulate("change", {
        target: changedValueOption
      });
  });
});
