import React from "react";
import { mount } from "enzyme";
import TextAreaField from ".";
import { noop } from "lodash";

describe("TextAreaField", () => {
  let newValue = "newValue";
  let onValueChange = (field, value) => {
    expect(field).toEqual(props.field);
    expect(value).toEqual(newValue);
  };
  let onKeyUp = noop;
  let props = {
    name: "TextAreaField name",
    onValueChange: onValueChange,
    value: "initial value",
    onKeyUp: onKeyUp,
    field: "field1",
    placeholder: "placeholder value"
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<TextAreaField {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("on change event handler should have field and value as parameter", () => {
    wrapper
      .find("textarea")
      .simulate("change", { target: { value: newValue } });
  });
});
