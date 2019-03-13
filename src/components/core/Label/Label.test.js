import React from "react";
import { mount } from "enzyme";
import Label from ".";

describe("Label", () => {
  let labelValue = "label Value";

  let handleClick = value => {
    expect(value).toEqual(labelValue);
  };

  let props = {
    id: "labelId",
    value: labelValue,
    title: "label title",
    onClick: handleClick
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Label {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render a div element", () => {
    expect(wrapper.find("div").length).toEqual(1);
  });

  it("props should be assigned properly", () => {
    expect(wrapper.find("div").prop("id")).toEqual(props.id);
    expect(wrapper.find("div").prop("title")).toEqual(props.title);
    expect(wrapper.find("div[id='" + props.id + "']").text()).toContain(
      props.value
    );
  });

  it("should handle change event", () => {
    wrapper.find("div").simulate("click", {});
  });
});
