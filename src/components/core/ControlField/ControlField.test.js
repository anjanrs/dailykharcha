import React from "react";
import ControlField from "./";
import { mount, shallow } from "enzyme";
import SelectBoxField from "../SelectBoxField";
import TextBoxField from "../TextBoxField";
import TextAreaField from "../TextAreaField";
import CheckBoxField from "../CheckBoxField";
import RadioButtonField from "../RadioButtonField";
import LabelField from "../LabelField";
import DateBoxField from "../DateBoxField";
import Link from "../Link";
import { Router } from "react-router";

describe("ControlField", () => {
  let props = {
    id: "id",
    name: "name",
    value: "1"
  };

  let wrapper;

  it("should render textbox field", () => {
    props.type = "textbox";
    wrapper = mount(<ControlField {...props} />);
    expect(wrapper.find(TextBoxField).length).toEqual(1);
    wrapper.unmount();
  });

  it("should render textarea field", () => {
    props.type = "textarea";
    wrapper = mount(<ControlField {...props} />);
    expect(wrapper.find(TextAreaField).length).toEqual(1);
    wrapper.unmount();
  });

  it("should render checkbox field", () => {
    props.type = "checkbox";
    wrapper = mount(<ControlField {...props} />);
    expect(wrapper.find(CheckBoxField).length).toEqual(1);
    wrapper.unmount();
  });

  it("should render selectbox field", () => {
    props.type = "selectbox";
    wrapper = mount(<ControlField {...props} />);
    expect(wrapper.find(SelectBoxField).length).toEqual(1);
    wrapper.unmount();
  });

  it("should render radiobutton field", () => {
    props.type = "radiobutton";
    wrapper = mount(<ControlField {...props} />);
    expect(wrapper.find(RadioButtonField).length).toEqual(1);
    wrapper.unmount();
  });

  it("should render Label field", () => {
    props.type = "label";
    wrapper = mount(<ControlField {...props} />);
    expect(wrapper.find(LabelField).length).toEqual(1);
    wrapper.unmount();
  });

  it("should render datebox field", () => {
    props.type = "datebox";
    wrapper = mount(<ControlField {...props} />);
    expect(wrapper.find(DateBoxField).length).toEqual(1);
    wrapper.unmount();
  });

  //   it("should render Link", () => {
  //     props.type = "link";
  //     wrapper = mount(
  //       <Router>
  //         <ControlField {...props} />
  //       </Router>
  //     );
  //     expect(wrapper.find(Link).length).toEqual(1);
  //     wrapper.unmount();
  //   });
});
