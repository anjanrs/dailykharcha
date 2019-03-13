import React from "react";
import { mount } from "enzyme";
import Spinner from "./";
import { ClipLoader } from "react-spinners";

describe("Spinner", () => {
  let props = {
    id: "SpinnerId"
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Spinner {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render ClipLoader", () => {
    expect(wrapper.find(ClipLoader).length).toEqual(1);
  });
});
