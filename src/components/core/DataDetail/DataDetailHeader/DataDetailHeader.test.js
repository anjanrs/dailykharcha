import React from "react";
import { mount } from "enzyme";
import DataDetailHeader from "../DataDetailHeader";
import DataDetailActions from "../DataDetailActions";
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faTrashAlt,
  faSave,
  faUndo,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
library.add(faTrashAlt, faSave, faUndo, faPlus);

describe("DataDetailHeader", () => {
  let eventHandler = () => {};
  let props = {
    onSave: eventHandler,
    onDelete: eventHandler,
    onCancel: eventHandler,
    onAddNew: eventHandler,
    title: "Data Detail Title",
    showSaveButton: true,
    showCancelButton: true,
    showDeleteButton: true,
    showAddNewButton: true
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<DataDetailHeader {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render DataDetailActions with proper props assigned", () => {
    expect(wrapper.find(DataDetailActions).length).toEqual(1);
    expect(wrapper.find(DataDetailActions).prop("onSave")).toEqual(
      props.onSave
    );
    expect(wrapper.find(DataDetailActions).prop("onDelete")).toEqual(
      props.onDelete
    );
    expect(wrapper.find(DataDetailActions).prop("onCancel")).toEqual(
      props.onCancel
    );
    expect(wrapper.find(DataDetailActions).prop("onAddNew")).toEqual(
      props.onAddNew
    );
    expect(wrapper.find(DataDetailActions).prop("showSaveButton")).toEqual(
      props.showSaveButton
    );
    expect(wrapper.find(DataDetailActions).prop("showCancelButton")).toEqual(
      props.showCancelButton
    );
    expect(wrapper.find(DataDetailActions).prop("showDeleteButton")).toEqual(
      props.showDeleteButton
    );
    expect(wrapper.find(DataDetailActions).prop("showAddNewButton")).toEqual(
      props.showAddNewButton
    );
  });
});
