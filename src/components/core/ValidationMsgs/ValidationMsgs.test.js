import React from "react";
import { mount } from "enzyme";
import ValidationMsgs from ".";

describe("ValidationMsgs", () => {
  let wrapper;
  let props = {
    messages: ["Validation Msg1", "Validation Msg2"]
  };

  beforeEach(() => {
    wrapper = mount(<ValidationMsgs {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render number of li equal to messages in props", () => {
    expect(wrapper.find("li").length).toEqual(props.messages.length);
  });
});
