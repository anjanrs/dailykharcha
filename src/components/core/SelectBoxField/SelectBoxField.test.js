import React from "react";
import { mount } from "enzyme";
import SelectBoxField from ".";
import _ from "lodash";

describe("SelectBoxField", () => {
  let options = [
    { value: "1", displayValue: "One", selected: false },
    { value: "2", displayValue: "Two", selected: false },
    { value: "3", displayValue: "Three", selected: false },
    { value: "4", displayValue: "Four", selected: false },
    { value: "5", displayValue: "Five", selected: false }
  ];

  let changedValues = ["3", "4", "5"];
  let onValueChange = (field, value) => {
    expect(field).toEqual(props.field);
    expect(value).toEqual(changedValues);
  };

  let props = {
    name: "SelectBox name",
    onValueChange: onValueChange,
    value: ["3"],
    field: "field",
    multiSelect: true,
    options: options
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<SelectBoxField {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("on change event handler should field and value as parameter", () => {
    let changedOptions = [...options];
    changedOptions = changedOptions.map(option => {
      if (_.indexOf(changedValues, option.value) > -1) {
        option.selected = true;
      }
      return option;
    });
    wrapper.find("select").simulate("change", {
      target: { options: changedOptions }
    });
  });
});
