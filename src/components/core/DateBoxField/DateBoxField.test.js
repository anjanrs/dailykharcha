import React from "react";
import { mount } from "enzyme";
import DateBoxField from ".";
import moment from "moment";

describe("DateBoxField", () => {
  let today = new Date();
  let newDate = new Date();
  newDate.setDate(today.getDate() + 2);
  let value = moment(today)
    .unix()
    .toString();
  let changedValue = moment(newDate).unix();

  let onValueChange = (field, value) => {
    expect(field).toEqual(props.field);
    expect(value).toEqual(changedValue);
  };

  let props = {
    name: "DateBoxField name",
    onValueChange: onValueChange,
    value: value,
    field: "field1"
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<DateBoxField {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("on change event handler should field and value as parameter", () => {
    wrapper.find("DatePicker").simulate("change", newDate);
  });
});
