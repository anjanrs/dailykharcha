import React from "react";
import { mount } from "enzyme";
import CmdButton from "./";
import { noop } from "lodash";

describe("CmdButton", () => {
  let active = true;
  let clickHandler = active ? () => {} : noop;

  let props = {
    id: "cmdButtonId",
    label: "cmdButton Label",
    active: active,
    type: "save",
    onClickHandler: clickHandler
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<CmdButton {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render div with proper id", () => {
    expect(wrapper.find("div[id='" + props.id + "']").length).toEqual(1);
  });

  it("should have proper css class", () => {
    const appendClass = props.active ? "active" : "inactive";
    expect(
      wrapper.find("div.btn-cmd--" + props.type + "." + appendClass).length
    ).toEqual(1);
  });

  it("should have click handler", () => {
    expect(wrapper.find("div[id='" + props.id + "']").prop("onClick")).toEqual(
      clickHandler
    );
  });
});
