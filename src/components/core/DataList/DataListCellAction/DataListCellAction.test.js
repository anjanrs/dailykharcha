import React from "react";
import { mount, ReactWrapper } from "enzyme";
import DataListCellAction from ".";

import { library } from "@fortawesome/fontawesome-svg-core";

import { faTrashAlt, faUndo, faSave } from "@fortawesome/free-solid-svg-icons";
library.add(faTrashAlt, faUndo, faSave);

describe("DataListCellAction", () => {
  let wrapper;
  const eventParam = "eventparam";
  let eventHandler = param => {
    expect(param).toEqual(eventParam);
  };

  let props = {
    onCancel: eventHandler,
    onDelete: eventHandler,
    onSave: eventHandler,
    editMode: false,
    showRowSaveButton: true,
    showRowCancelButton: true,
    showRowDeleteButton: true
  };
  ReactWrapper.prototype.findCmdButton = function(type) {
    return this.findWhere(
      button => button.name() === "CmdButton" && button.prop("type") === type
    );
  };
  beforeEach(() => {
    wrapper = mount(<DataListCellAction {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("if showRowSaveButton is true, should render CmdButton for save", () => {
    wrapper.setProps({ showRowSaveButton: true, editMode: true });
    expect(wrapper.findCmdButton("save").length).toEqual(1);
    expect(wrapper.findCmdButton("save").prop("active")).toEqual(true);

    wrapper.setProps({ showRowSaveButton: true, editMode: false });
    expect(wrapper.findCmdButton("save").prop("active")).toEqual(false);

    wrapper.setProps({ showRowSaveButton: false });
    expect(wrapper.findCmdButton("save").length).toEqual(0);
  });

  it("if showRowCancelButton is true, should render CmdButton for cancel", () => {
    wrapper.setProps({ showRowCancelButton: true, editMode: true });
    expect(wrapper.findCmdButton("cancel").length).toEqual(1);
    expect(wrapper.findCmdButton("cancel").prop("active")).toEqual(true);

    wrapper.setProps({ showRowCancelButton: true, editMode: false });
    expect(wrapper.findCmdButton("cancel").prop("active")).toEqual(false);

    wrapper.setProps({ showRowCancelButton: false });
    expect(wrapper.findCmdButton("cancel").length).toEqual(0);
  });

  it("if showRowDeleteButton is true, should render CmdButton for delete", () => {
    wrapper.setProps({ showRowDeleteButton: true });
    expect(wrapper.findCmdButton("delete").length).toEqual(1);
    wrapper.setProps({ showRowDeleteButton: false });
    expect(wrapper.findCmdButton("delete").length).toEqual(0);
  });

  it("CmdButton should trigger events properly", () => {
    wrapper.findCmdButton("save").prop("onClickHandler")(eventParam);
    wrapper.findCmdButton("cancel").prop("onClickHandler")(eventParam);
    wrapper.findCmdButton("delete").prop("onClickHandler")(eventParam);
  });
});
