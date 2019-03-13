import React from "react";
import { mount } from "enzyme";
import { fromJS } from "immutable";
import _ from "lodash";

import DataDetailRow from "../DataDetailRow";
import ControlField from "../../ControlField";
import ValidationMsgs from "../../ValidationMsgs";

describe("DataDetailRow", () => {
  let wrapper;
  let changedValue = "new value";
  let onEdit = (field, newValue) => {
    expect(field).toEqual(itemNameField.field);
    expect(newValue).toEqual(changedValue);
  };

  const itemNameField = {
    field: "item_name",
    title: "Item Name",
    editControl: {
      type: "textbox",
      validations: {
        isRequired: true,
        minLength: 3,
        maxLength: 100
      }
    }
  };

  let invalidMsgs = ["Invalid message1", "Invalid message2"];

  let props = {
    detailField: fromJS(itemNameField),
    editValue: "edit value",
    onEdit: onEdit,
    invalidMsgs: fromJS(invalidMsgs)
  };

  beforeEach(() => {
    wrapper = mount(<DataDetailRow {...props} />);
  });

  it("should render ControlField with props assigned properly", () => {
    expect(wrapper.find(ControlField).length).toEqual(1);
    expect(wrapper.find(ControlField).prop("value")).toEqual(props.editValue);
    let name = `edit-${itemNameField.field}`;
    expect(wrapper.find(ControlField).prop("name")).toEqual(name);
    expect(wrapper.find(ControlField).prop("field")).toEqual(
      itemNameField.field
    );
    _.forEach(_.keys(itemNameField.editControl), key => {
      expect(wrapper.find(ControlField).prop(key)).toEqual(
        itemNameField.editControl[key]
      );
    });
  });

  it("should render ValidationMsgs if there are invalidMsgs", () => {
    if (invalidMsgs.length > 0) {
      expect(wrapper.find(ValidationMsgs).length).toEqual(1);
      expect(wrapper.find(ValidationMsgs).prop("messages")).toEqual(
        invalidMsgs
      );
    }
  });

  it("should not render ValidationMsgs if there are no invalidMsgs", () => {
    wrapper.setProps({ invalidMsgs: fromJS([]) });
    expect(wrapper.find(ValidationMsgs).length).toEqual(0);
  });

  it("should render a title", () => {
    expect(
      wrapper.find("div[className='detail__field-label']").text()
    ).toContain(itemNameField.title);
  });

  it("should call event callback with proper params", () => {
    wrapper.find(ControlField).prop("onValueChange")(
      itemNameField.field,
      changedValue
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
