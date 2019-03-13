import React from "react";
import { mount } from "enzyme";
import TextBox from ".";

describe("TextBox", () => {
  let newInputValue = "new value";

  let handleValueChange = newValue => {
    expect(newValue).toEqual(newInputValue);
  };

  let onKeyUp = event => {
    expect(event.keyCode).toEqual(13);
  };

  let props = {
    id: "textBoxID",
    name: "textBoxName",
    placeholder: "placeholder text",
    value: "textbox value",
    handleValueChange: handleValueChange,
    onKeyUp: onKeyUp
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<TextBox {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render a input element", () => {
    expect(wrapper.find("input").length).toEqual(1);
  });

  it("props should be assigned properly", () => {
    expect(wrapper.find("div").prop("id")).toEqual(props.id);
    expect(wrapper.find("input").prop("name")).toEqual(props.name);
    expect(wrapper.find("input").prop("placeholder")).toEqual(
      props.placeholder
    );
    expect(wrapper.find("input").prop("value")).toEqual(props.value);
  });

  it("should handle change event", () => {
    wrapper.find("input").simulate("change", {
      target: { value: newInputValue }
    });
  });

  it("should handle key up event", () => {
    wrapper.find("input").simulate("keyUp", { keyCode: 13 });
  });
});
