import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { fromJS, Map } from "immutable";
import { noop } from "lodash";
import columns from "./ListColumns";

import DataListRow from ".";
import CheckBox from "../../CheckBox";
import DataListCellAction from "../DataListCellAction";
import DataListCell from "../DataListCell";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrashAlt,
  faEdit,
  faSave,
  faUndo,
  faPlus,
  faSearch,
  faAngleRight,
  faAngleLeft,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faTrashAlt,
  faEdit,
  faSave,
  faUndo,
  faPlus,
  faSearch,
  faAngleRight,
  faAngleLeft,
  faTimesCircle
);

describe("DataListRow", () => {
  let wrapper;

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
  let editedItem = { ...rowItem, item_name: "edited item name" };

  let validationMsgs = {
    valid: true,
    msgs: {}
  };

  let props = {
    primaryField: "id",
    item: fromJS(rowItem),
    editedItem: fromJS(editedItem),
    columns: columns,
    onRowEdit: noop,
    onRowCancel: noop,
    onRowDelete: noop,
    onRowSave: noop,
    onCellClick: noop,
    onRowChecked: noop,
    editMode: false,
    rowChecked: false,
    validationMsgs: fromJS(validationMsgs),
    showRowCancelButton: true,
    showRowSaveButton: true,
    showRowDeleteButton: true,
    showDeleteAllButton: true
  };

  const WrapperComponent = props => {
    return (
      <table>
        <tbody>
          <DataListRow {...props} />
        </tbody>
      </table>
    );
  };

  ReactWrapper.prototype.findColumnByField = function(field) {
    return this.findWhere(node => {
      if (node.name() === "renderDataListCell") {
        let column = node.prop("column").toJS();
        if (column.field === field) {
          return true;
        }
      }
      return false;
    });
  };

  beforeEach(() => {
    wrapper = mount(<WrapperComponent {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("if showDeleteAllButton is true, should render checkbox for row", () => {
    wrapper.setProps({ showDeleteAllButton: true });
    expect(wrapper.find(CheckBox).length).toEqual(1);
  });

  it("if showDeleteAllButton is false, should not render checkbox for row", () => {
    wrapper.setProps({ showDeleteAllButton: false });
    expect(wrapper.find(CheckBox).length).toEqual(0);
  });

  if (
    ("if showRowSaveButton or showRowCancelButton or showRowDeleteButton is true, should render DataListCellAction",
    () => {
      wrapper.setProps({
        showRowSaveButton: true,
        showRowCancelButton: false,
        showRowDeleteButton: false
      });
      expect(wrapper.find(DataListCellAction).length).toEqual(1);
      wrapper.setProps({
        showRowSaveButton: false,
        showRowCancelButton: false,
        showRowDeleteButton: true
      });
      expect(wrapper.find(DataListCellAction).length).toEqual(1);
      wrapper.setProps({
        showRowSaveButton: false,
        showRowCancelButton: false,
        showRowDeleteButton: true
      });
      expect(wrapper.find(DataListCellAction).length).toEqual(1);
      wrapper.setProps({
        showRowSaveButton: false,
        showRowCancelButton: false,
        showRowDeleteButton: false
      });
      expect(wrapper.find(DataListCellAction).length).toEqual(0);
    })
  );

  it("should render DataListCell for every column expect column with type hidden", () => {
    expect(wrapper.find(DataListCell).length).toEqual(
      columns.toJS().length - 1
    );
  });

  it("should trigger onRowEdit properly", () => {
    let editedField = "item_name";
    let editedFieldValue = "new value";

    let onEditHandler = editedRowItem => {
      expect(editedRowItem.get(editedField)).toEqual(editedFieldValue);
    };

    wrapper.setProps({ onRowEdit: onEditHandler });
    let itemNameColumnCell = wrapper.findColumnByField(editedField);
    itemNameColumnCell.prop("onEdit")(editedField, editedFieldValue);
  });

  it("should trigger onCellClick properly", () => {
    let clickedField = "item_name";
    let clickedCellColumn = wrapper
      .findColumnByField(clickedField)
      .prop("column");
    let onCellClickHandler = (clickedRowItem, column, editMode) => {
      expect(clickedRowItem.toJS()).toEqual(rowItem);
      expect(column).toEqual(clickedCellColumn);
      expect(editMode).toEqual(props.editMode);
    };

    wrapper.setProps({ onCellClick: onCellClickHandler });
    let itemNameColumnCell = wrapper.findColumnByField(clickedField);
    itemNameColumnCell.prop("onCellClick")(clickedCellColumn);
  });

  it("should trigger onRowChecked properly", () => {
    let onRowCheckedHandler = (checked, id) => {
      expect(checked).toEqual(true);
      expect(id).toEqual(rowItem.id.toString());
    };
    let onRowUnCheckedHandler = (checked, id) => {
      expect(checked).toEqual(false);
      expect(id).toEqual(rowItem.id.toString());
    };
    wrapper.setProps({
      showDeleteAllButton: true,
      onRowChecked: onRowCheckedHandler
    });
    wrapper.find(CheckBox).prop("handleValueChange")([rowItem.id.toString()]);

    wrapper.setProps({
      showDeleteAllButton: true,
      onRowChecked: onRowUnCheckedHandler
    });
    wrapper.find(CheckBox).prop("handleValueChange")([]);
  });

  it("should handle onRowCancel, onRowDelete, onRowSave properly", () => {
    let eventHandler = item => {
      expect(item.toJS()).toEqual(rowItem);
    };

    let onRowSaveHandler = newEditedItem => {
      expect(newEditedItem.toJS()).toEqual(editedItem);
    };
    wrapper.setProps({
      onRowCancel: eventHandler,
      onRowDelete: eventHandler,
      onRowSave: onRowSaveHandler,
      showRowSaveButton: true,
      showRowCancelButton: false,
      showRowDeleteButton: false
    });
    let itemNameColumnCell = wrapper.find(DataListCellAction);
    itemNameColumnCell.prop("onCancel")({});
    itemNameColumnCell.prop("onDelete")({});
    itemNameColumnCell.prop("onSave")({});
  });
});
