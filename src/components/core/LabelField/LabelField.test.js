import React from "react";
import { mount } from "enzyme";
import LabelField from ".";

describe("LabelField", () => {
  let initalValue = "initial value";
  let onClick = value => {
    // console.log("field, value", field, value);
    // expect(field).toEqual(props.field);
    expect(value).toEqual(initalValue);
  };

  let props = {
    name: "LabelField name",
    value: initalValue,
    title: "LabelField Title",
    field: "field1",
    onClick: onClick
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<LabelField {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("on change event handler should have field and value as parameter", () => {
    wrapper.find("div").simulate("click", {});
  });
});
