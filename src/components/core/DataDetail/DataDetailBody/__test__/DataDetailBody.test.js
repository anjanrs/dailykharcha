import React from "react";
import { mount } from "enzyme";
import { fromJS } from "immutable";
import _ from "lodash";

import DataDetailBody from "..";
import DataDetailRow from "../../DataDetailRow";
import DetailFields from "./DetailFields";

describe("DataDetailBody", () => {
  let wrapper;
  let EditedData = {
    id: "1",
    item_name: "vegies",
    desc: "green vegies",
    expense_date: "125852451",
    store_id: "1",
    expense_type_id: "1",
    sub_expense_type_id: "1",
    quantity: "1",
    unit_id: "1",
    unit_price: "1",
    amount: "1"
  };
  let onEdit = () => {
    // expect().toEqual();
  };

  let validations = {
    id: [],
    item_name: ["Validation msg 1", "Validation msg 2"],
    desc: [],
    expense_date: [],
    store_id: [],
    expense_type_id: [],
    sub_expense_type_id: [],
    quantity: [],
    unit_id: [],
    unit_price: [],
    amount: []
  };

  let props = {
    fields: fromJS(DetailFields),
    editedData: fromJS(EditedData),
    validations: fromJS(validations),
    onEdit: onEdit
  };

  beforeEach(() => {
    wrapper = mount(<DataDetailBody {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render DataDetailRow with props assigned properly", () => {
    expect(wrapper.find(DataDetailRow).length).toEqual(DetailFields.length);
    DetailFields.forEach((detailField, index) => {
      validations = fromJS(validations);
      let fieldName = detailField["field"];
      expect(
        wrapper.findWhere(item => {
          return (
            item.name() === "renderDataDetailRow" &&
            item.prop("detailField") &&
            item.prop("editValue") &&
            item.prop("onEdit") &&
            item.prop("invalidMsgs") &&
            _.isEqual(item.prop("detailField"), fromJS(detailField)) &&
            item.prop("editValue") === EditedData[fieldName].toString() &&
            item.prop("onEdit") === onEdit &&
            _.isEqual(item.prop("invalidMsgs"), validations.get(fieldName))
          );
        }).length
      ).toEqual(1);
    });
  });
});
