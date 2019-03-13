import React from "react";
import { mount } from "enzyme";
import SelectBox, { selectValue } from ".";
import _ from "lodash";

describe("SelectBox", () => {
  let options = [
    { value: "1", displayValue: "One", selected: false },
    { value: "2", displayValue: "Two", selected: false },
    { value: "3", displayValue: "Three", selected: false },
    { value: "4", displayValue: "Four", selected: false },
    { value: "5", displayValue: "Five", selected: false }
  ];
  let changedValues = ["3", "4", "5"];

  let handleValueChange = newValues => {
    expect(newValues).toEqual(changedValues);
  };

  let props = {
    id: "selectBoxID",
    name: "selectBoxName",
    value: ["1", "2", "3"],
    multiSelect: true,
    handleValueChange: handleValueChange,
    options: options
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<SelectBox {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render a select element", () => {
    expect(wrapper.find("select").length).toEqual(1);
  });

  it("props should be assigned properly", () => {
    expect(wrapper.find("div").prop("id")).toEqual(props.id);
    expect(wrapper.find("select").prop("name")).toEqual(props.name);
    expect(wrapper.find("select").prop("multiple")).toEqual(props.multiSelect);
    expect(wrapper.find("select").prop("value")).toEqual(
      selectValue(props.multiSelect, props.value)
    );
    options.forEach((option, index) => {
      let selector = "select option[value='" + option.value + "']";
      expect(wrapper.find(selector).length).toEqual(1);
      expect(wrapper.find(selector).text()).toContain(option.displayValue);
    });
  });

  it("should handle change event", () => {
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
