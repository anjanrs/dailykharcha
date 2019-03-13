import React from "react";
import { mount } from "enzyme";
import TextBoxField from ".";
import { noop } from "lodash";

describe("TextBoxField", () => {
  let newValue = "newValue";
  let onValueChange = (field, value) => {
    expect(field).toEqual(props.field);
    expect(value).toEqual(newValue);
  };
  let onKeyUp = noop;
  let props = {
    name: "TextBoxField name",
    onValueChange: onValueChange,
    value: "initial value",
    onKeyUp: onKeyUp,
    field: "field1",
    placeholder: "placeholder value"
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<TextBoxField {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("on change event handler should field and value as parameter", () => {
    wrapper.find("input").simulate("change", { target: { value: newValue } });
  });
});
