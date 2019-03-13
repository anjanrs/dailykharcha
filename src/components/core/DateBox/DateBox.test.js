import React from "react";
import { shallow, mount } from "enzyme";
import DateBox from ".";
import moment from "moment";

describe("DateBox", () => {
  let today = new Date();
  let newDate = new Date();
  newDate.setDate(today.getDate() + 2);
  let value = moment(today)
    .unix()
    .toString();
  let changedValue = moment(newDate).unix();
  let handleValueChange = dateValue => {
    expect(dateValue).toEqual(changedValue);
  };

  let props = {
    id: "dateBoxId",
    name: "datebox name",
    value: value,
    placeholder: "datebox placeholder",
    handleValueChange: handleValueChange
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<DateBox {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render a DatePicker", () => {
    expect(wrapper.find("DatePicker").length).toEqual(1);
  });

  it("props should be assigned properly", () => {
    expect(wrapper.find("div[id='" + props.id + "']").length).toEqual(1);
    expect(wrapper.find("DatePicker").prop("name")).toEqual(props.name);
    expect(wrapper.find("DatePicker").prop("placeholderText")).toEqual(
      props.placeholder
    );
    expect(wrapper.find("DatePicker").prop("selected")).toEqual(
      moment.unix(props.value).toDate()
    );
  });

  it("should handle change event", () => {
    wrapper.find("DatePicker").simulate("change", newDate);
  });
});
