import React from "react";
import { mount } from "enzyme";
import TextArea from ".";

describe("TextArea", () => {
  let newInputValue = "new value";

  let handleValueChange = newValue => {
    expect(newValue).toEqual(newInputValue);
  };

  let onKeyUp = event => {
    expect(event.keyCode).toEqual(13);
  };

  let props = {
    id: "textAreaID",
    name: "textAreaName",
    placeholder: "placeholder text",
    value: "textArea value",
    handleValueChange: handleValueChange,
    onKeyUp: onKeyUp
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<TextArea {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render a textarea element", () => {
    expect(wrapper.find("textarea").length).toEqual(1);
  });

  it("props should be assigned properly", () => {
    expect(wrapper.find("div").prop("id")).toEqual(props.id);
    expect(wrapper.find("textarea").prop("name")).toEqual(props.name);
    expect(wrapper.find("textarea").prop("placeholder")).toEqual(
      props.placeholder
    );
    expect(wrapper.find("textarea").prop("value")).toEqual(props.value);
  });

  it("should handle change event", () => {
    wrapper.find("textarea").simulate("change", {
      target: { value: newInputValue }
    });
  });

  it("should handle key up event", () => {
    wrapper.find("textarea").simulate("keyUp", { keyCode: 13 });
  });
});
