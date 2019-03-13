import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { fromJS } from "immutable";
import DataListCell from "..";
import ValidationMsgs from "../../../ValidationMsgs";
import {
  idColumn,
  nameColumn,
  descColumn,
  dateColumn,
  storeColumn,
  subExpenseTypeColumn,
  quantityColumn,
  CustomCellComponent
} from "./ListColumns";

describe("DataListCell", () => {
  let wrapper;
  let newVal = "new Value";
  let onCellClick = column => {
    expect(column.toJS()).toEqual(descColumn);
  };
  let onEdit = (field, value) => {
    expect(field).toEqual(descColumn.field);
    expect(value).toEqual(newVal);
  };

  let rowItem = {
    id: 1,
    item_name: "Test item",
    desc: "Item description",
    expense_date: 124568974,
    store_id: 2,
    expense_type_id: 1,
    sub_expense_type_id: 2,
    quantity: 10,
    unit_id: 1,
    unit_price: 2,
    amount: 20
  };

  let props = {
    editMode: false,
    column: fromJS(nameColumn),
    rowItem: fromJS(rowItem),
    invalidMsgs: fromJS(["test"]),
    displayValue: "test value",
    editValue: "edit value",
    onEdit: onEdit,
    onCellClick: onCellClick
  };

  ReactWrapper.prototype.findFieldControl = function(type) {
    return this.findWhere(fieldControl => {
      return (
        fieldControl.name() === "ControlField" &&
        fieldControl.prop("type") === type
      );
    });
  };

  beforeEach(() => {
    wrapper = mount(<DataListCell {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render ValidationMsgs if column type is not hidden", () => {
    wrapper.setProps({ column: fromJS(nameColumn) });
    expect(wrapper.find(ValidationMsgs).length).toEqual(1);
  });

  it("if column type is hidden, should not render anything", () => {
    wrapper.setProps({ column: fromJS(idColumn) });
    expect(wrapper.html()).toEqual(null);
  });

  it("if column type is custom, should render CustomCellComponent with proper props", () => {
    wrapper.setProps({ column: fromJS(nameColumn) });
    expect(wrapper.find(CustomCellComponent).length).toEqual(1);
  });

  it("if edit Mode is false and column type is editable, should render only Control Field of type label", () => {
    wrapper.setProps({ editMode: false, column: fromJS(descColumn) });
    let fieldControl = wrapper.findFieldControl("label");
    expect(fieldControl.length).toEqual(1);
    expect(fieldControl.prop("name")).toEqual(`edit-${descColumn.field}`);
    expect(fieldControl.prop("value")).toEqual(props.displayValue);
    expect(fieldControl.prop("field")).toEqual(descColumn.field);
  });

  it("if column type is label, should render only Control Field of type label", () => {
    wrapper.setProps({ column: fromJS(storeColumn) });
    let fieldControl = wrapper.findFieldControl("label");
    expect(fieldControl.length).toEqual(1);
    expect(fieldControl.prop("name")).toEqual(`edit-${storeColumn.field}`);
    expect(fieldControl.prop("value")).toEqual(props.displayValue);
    expect(fieldControl.prop("field")).toEqual(storeColumn.field);
  });

  // it("if column type is link, should render only Control Field of type label", () => {
  //   wrapper.setProps({ editMode: false, column: fromJS(expenseTypeColumn) });
  //   let fieldControl = wrapper.findFieldControl("link");
  //   expect(fieldControl.length).toEqual(1);
  //   expect(fieldControl.prop("name")).toEqual(
  //     `edit-${expenseTypeColumn.field}`
  //   );
  //   expect(fieldControl.prop("value")).toEqual(props.displayValue);
  //   expect(fieldControl.prop("field")).toEqual(expenseTypeColumn.field);
  // });

  it("if editMode is true and column type is editbale, should render only one Control Field of type  specified in column editControl", () => {
    wrapper.setProps({ editMode: true, column: fromJS(subExpenseTypeColumn) });
    let fieldControl = wrapper.findFieldControl(
      subExpenseTypeColumn.editControl.type
    );
    expect(fieldControl.length).toEqual(1);
    expect(fieldControl.prop("name")).toEqual(
      `edit-${subExpenseTypeColumn.field}`
    );
    expect(fieldControl.prop("value")).toEqual(props.editValue);
    expect(fieldControl.prop("field")).toEqual(subExpenseTypeColumn.field);

    wrapper.setProps({ editMode: true, column: fromJS(quantityColumn) });
    fieldControl = wrapper.findFieldControl(quantityColumn.editControl.type);
    expect(fieldControl.length).toEqual(1);
    expect(fieldControl.prop("name")).toEqual(`edit-${quantityColumn.field}`);
    expect(fieldControl.prop("value")).toEqual(props.editValue);
    expect(fieldControl.prop("field")).toEqual(quantityColumn.field);

    wrapper.setProps({ editMode: true, column: fromJS(dateColumn) });
    fieldControl = wrapper.findFieldControl(dateColumn.editControl.type);
    expect(fieldControl.length).toEqual(1);
    expect(fieldControl.prop("name")).toEqual(`edit-${dateColumn.field}`);
    expect(fieldControl.prop("value")).toEqual(props.editValue);
    expect(fieldControl.prop("field")).toEqual(dateColumn.field);

    wrapper.setProps({ editMode: true, column: fromJS(descColumn) });
    fieldControl = wrapper.findFieldControl(descColumn.editControl.type);
    expect(fieldControl.length).toEqual(1);
    expect(fieldControl.prop("name")).toEqual(`edit-${descColumn.field}`);
    expect(fieldControl.prop("value")).toEqual(props.editValue);
    expect(fieldControl.prop("field")).toEqual(descColumn.field);
  });

  it("should trigger onCellClick event properly", () => {
    wrapper.setProps({ editMode: false, column: fromJS(descColumn) });
    wrapper
      .find("div[className='cell-wrapper']")
      .simulate("click", "test", "test2");
  });

  it("should trigger onEdit event properly", () => {
    wrapper.setProps({ editMode: true, column: fromJS(descColumn) });
    let fieldControl = wrapper.findFieldControl(descColumn.editControl.type);
    fieldControl.prop("onValueChange")(descColumn.field, newVal);
  });
});
