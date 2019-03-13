import React from "react";
import { mount } from "enzyme";
import ModalBox from ".";
import CmdButton from "../CmdButton";
import { library } from "@fortawesome/fontawesome-svg-core";

import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
library.add(faTimesCircle);

describe("ModalBox", () => {
  let onCloseClick = () => {};
  let onOverlayClick = () => {};
  let wrapper;

  let props = {
    id: "ModalBoxId",
    isOpen: true,
    onCloseClick: onCloseClick,
    onOverlayClick: onOverlayClick
  };

  let childElement = <div>This is child element</div>;

  beforeEach(() => {
    wrapper = mount(<ModalBox {...props}>{childElement}</ModalBox>);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should have div with proper id", () => {
    expect(
      wrapper.find('div[id="' + props.id + '"][className="modal-box__wrapper"]')
        .length
    ).toEqual(1);
  });

  it("should have overlay div in side main div wrapper", () => {
    expect(
      wrapper.find(
        'div[id="' + props.id + '"]>div[className="modal-box__overlay"]'
      ).length
    ).toEqual(1);
  });

  it("should have content div in side main div wrapper", () => {
    expect(
      wrapper.find(
        'div[id="' + props.id + '"]>div[className="modal-box__content-wrapper"]'
      ).length
    ).toEqual(1);
  });

  it("should contain have CmdButton", () => {
    expect(wrapper.find(CmdButton).length).toEqual(1);
  });

  it("overlay should handle onOverlayClick event", () => {
    expect(
      wrapper
        .find('div[id="' + props.id + '"]>div[className="modal-box__overlay"]')
        .prop("onClick")
    ).toEqual(onOverlayClick);
  });

  it("CmdButton should handle onCloseClick event", () => {
    expect(wrapper.find(CmdButton).prop("onClickHandler")).toEqual(
      onCloseClick
    );
  });

  it("content div should render the child elements", () => {
    expect(
      wrapper
        .find(
          'div[id="' +
            props.id +
            '"]>div[className="modal-box__content-wrapper"]'
        )
        .contains(childElement)
    ).toEqual(true);
  });

  it("should render null if isOpen props is false", () => {
    wrapper.setProps({ isOpen: false });
    expect(wrapper.html()).toEqual(null);
  });
});
