import React from "react";
import { mount } from "enzyme";
import DataDetailActions from ".";
import CmdButton from "../../CmdButton";
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faTrashAlt,
  faSave,
  faUndo,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
library.add(faTrashAlt, faSave, faUndo, faPlus);

describe("DataDetailActions", () => {
  let wrapper;
  let eventParams = {
    forSave: "save",
    forDelete: "delete",
    forCancel: "cancel",
    forAddNew: "add-new"
  };
  let onSave = eventParam => {
    expect(eventParam).toEqual(eventParams.forSave);
  };
  let onDelete = eventParam => {
    expect(eventParam).toEqual(eventParams.forDelete);
  };
  let onCancel = eventParam => {
    expect(eventParam).toEqual(eventParams.forCancel);
  };
  let onAddNew = eventParam => {
    expect(eventParam).toEqual(eventParams.forAddNew);
  };

  let props = {
    onSave: onSave,
    onDelete: onDelete,
    onCancel: onCancel,
    onAddNew: onAddNew,
    showSaveButton: true,
    showCancelButton: true,
    showDeleteButton: true,
    showAddNewButton: true
  };

  beforeEach(() => {
    wrapper = mount(<DataDetailActions {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render a div", () => {
    expect(wrapper.find('div[className="detail-actions"]').length).toEqual(1);
  });

  it("should render CmdButton of type save if showSaveButton true else not", () => {
    wrapper.setProps({ showSaveButton: true });
    expect(
      wrapper.find(CmdButton).findWhere(node => node.props().type === "save")
        .length
    ).toEqual(1);
    wrapper.setProps({ showSaveButton: false });
    expect(
      wrapper.find(CmdButton).findWhere(node => node.props().type === "save")
        .length
    ).toEqual(0);
  });

  it("should render CmdButton of type delete if showSaveButton true else not", () => {
    wrapper.setProps({ showDeleteButton: true });
    expect(
      wrapper.find(CmdButton).findWhere(node => node.props().type === "delete")
        .length
    ).toEqual(1);
    wrapper.setProps({ showDeleteButton: false });
    expect(
      wrapper.find(CmdButton).findWhere(node => node.props().type === "delete")
        .length
    ).toEqual(0);
  });

  it("should render CmdButton of type cancel if showSaveButton true else not", () => {
    wrapper.setProps({ showCancelButton: true });
    expect(
      wrapper.find(CmdButton).findWhere(node => node.props().type === "cancel")
        .length
    ).toEqual(1);
    wrapper.setProps({ showCancelButton: false });
    expect(
      wrapper.find(CmdButton).findWhere(node => node.props().type === "cancel")
        .length
    ).toEqual(0);
  });

  it("should render CmdButton of type add-new if showSaveButton true else not", () => {
    wrapper.setProps({ showAddNewButton: true });
    expect(
      wrapper.find(CmdButton).findWhere(node => node.props().type === "add-new")
        .length
    ).toEqual(1);
    wrapper.setProps({ showAddNewButton: false });
    expect(
      wrapper.find(CmdButton).findWhere(node => node.props().type === "add-new")
        .length
    ).toEqual(0);
  });

  it("should handle the events properly", () => {
    wrapper.setProps({ showSaveButton: true });
    wrapper
      .find(CmdButton)
      .findWhere(node => node.props().type === "save")
      .prop("onClickHandler")(eventParams.forSave);

    wrapper.setProps({ showCancelButton: true });
    wrapper
      .find(CmdButton)
      .findWhere(node => node.props().type === "cancel")
      .prop("onClickHandler")(eventParams.forCancel);

    wrapper.setProps({ showDeleteButton: true });
    wrapper
      .find(CmdButton)
      .findWhere(node => node.props().type === "delete")
      .prop("onClickHandler")(eventParams.forDelete);

    wrapper.setProps({ showAddNewButton: true });
    wrapper
      .find(CmdButton)
      .findWhere(node => node.props().type === "add-new")
      .prop("onClickHandler")(eventParams.forAddNew);
  });
});
