import React from "react";
import { mount } from "enzyme";
import CheckBox, { shouldChecked } from ".";

describe("CheckBox", () => {
  let options = [
    { value: "1", displayValue: "One", checked: false },
    { value: "2", displayValue: "Two", checked: false },
    { value: "3", displayValue: "Three", checked: false },
    { value: "4", displayValue: "Four", checked: false },
    { value: "5", displayValue: "Five", checked: false }
  ];
  let changedValueOption = { value: "2", displayValue: "Four", checked: false };
  let expectedValueOption = ["1"];

  let handleValueChange = newValues => {
    expect(newValues).toEqual(expectedValueOption);
  };

  let props = {
    id: "checkboxId",
    name: "checkboxName",
    value: ["1", "2"],
    handleValueChange: handleValueChange,
    options: options
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<CheckBox {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("number of checkbox input rendered should be equal to options", () => {
    expect(wrapper.find("input[type='checkbox']").length).toEqual(
      options.length
    );
  });

  it("number of wrapper label for checkbox input rendered should be equal to options", () => {
    expect(wrapper.find("label").length).toEqual(options.length);
  });

  it("number of span for checkbox input rendered should be equal to options", () => {
    expect(wrapper.find("span").length).toEqual(options.length);
  });

  it("span for checkbox input must have dispaly value as text", () => {
    options.forEach((option, index) => {
      expect(
        wrapper
          .find("span")
          .findWhere(
            item =>
              item.type() === "span" && item.text() === option.displayValue
          ).length
      ).toEqual(1);
    });
  });

  it("props should be assigned properly", () => {
    expect(wrapper.find("div").prop("id")).toEqual(props.id);
    options.forEach((option, index) => {
      let selector = "input[name='" + props.name + "']";
      selector += "[type='checkbox']";
      selector += "[value='" + option.value + "']";
      selector += "[checked=" + shouldChecked(option.value, props.value) + "]";
      expect(wrapper.find(selector).length).toEqual(1);
    });
  });

  it("should handle change event", () => {
    wrapper
      .find("input")
      .first()
      .simulate("change", {
        target: changedValueOption
      });
  });
});
