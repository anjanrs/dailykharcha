import React from "react";
import { mount } from "enzyme";
import ConfirmModalBox from "./";
import ModalBox from "../ModalBox";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
library.add(faTimesCircle);

describe("ConfirmModalBox", () => {
  let wrapper;
  let eventParam = { target: { value: "dummy" } };
  let handler = event => {
    expect(event).toEqual(eventParam);
  };
  let onConfirmClick = handler;
  let onCancelClick = handler;
  let onOverlayClick = handler;
  let onClose = handler;

  let props = {
    id: "ConfirmModalBoxId",
    isOpen: true,
    message: "Are you sure?",
    onConfirmClick: onConfirmClick,
    onCancelClick: onCancelClick,
    onOverlayClick: onOverlayClick,
    onCloseClick: onClose,
    cancelLabel: "Cancel",
    confirmLabel: "Confirm"
  };

  beforeEach(() => {
    wrapper = mount(<ConfirmModalBox {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render a modal box", () => {
    expect(wrapper.find(ModalBox).length).toEqual(1);
  });

  it("should render a message", () => {
    expect(
      wrapper
        .find(ModalBox)
        .find('div[className="confirm-box__message"]')
        .text()
    ).toEqual(props.message);
  });

  it("should render a cmd buttons with proper label and type", () => {
    expect(
      wrapper.find(ModalBox).findWhere(node => node.props().type === "no")
        .length
    ).toEqual(1);
    expect(
      wrapper.find(ModalBox).findWhere(node => {
        return node.props().type === "yes";
      }).length
    ).toEqual(1);
    expect(
      wrapper
        .find(ModalBox)
        .findWhere(node => node.props().type === "no")
        .text()
    ).toEqual(props.cancelLabel);
    expect(
      wrapper
        .find(ModalBox)
        .findWhere(node => node.props().type === "yes")
        .text()
    ).toEqual(props.confirmLabel);
  });

  it("should assing props properly to Modal Box", () => {
    expect(wrapper.find(ModalBox).prop("id")).toEqual(props.id);
    expect(wrapper.find(ModalBox).prop("isOpen")).toEqual(props.isOpen);
  });

  it("should call proper event handlers", () => {
    wrapper.find(ModalBox).prop("onCloseClick")(eventParam);
    wrapper.find(ModalBox).prop("onOverlayClick")(eventParam);
    wrapper
      .find(ModalBox)
      .findWhere(node => node.props().type === "no")
      .prop("onClickHandler")(eventParam);

    wrapper
      .find(ModalBox)
      .findWhere(node => node.props().type === "yes")
      .prop("onClickHandler")(eventParam);
  });
});
