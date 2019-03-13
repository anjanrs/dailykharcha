import React from "react";
import { withHandlers, pure, compose } from "recompose";
import T from "prop-types";
import { noop } from "lodash";
import ModalBox from "../ModalBox";
import CmdButton from "../CmdButton";
import "./style.scss";

const renderConfirmModalBox = ({
  isOpen,
  message,
  cancelLabel,
  confirmLabel,
  handleConfirm,
  handleCancel,
  handleClose,
  handleOverlayClick,
  id
}) => {
  return (
    <ModalBox
      id={id}
      isOpen={isOpen}
      onCloseClick={handleClose}
      onOverlayClick={handleOverlayClick}
    >
      <div className="confirm-box__message">{message}</div>
      <div className="confirm-box__btns-wrapper">
        <CmdButton active={true} type="no" onClickHandler={handleCancel}>
          {cancelLabel}
        </CmdButton>
        <CmdButton active={true} type="yes" onClickHandler={handleConfirm}>
          {confirmLabel}
        </CmdButton>
      </div>
    </ModalBox>
  );
};

const withEventHandlers = withHandlers({
  handleConfirm: ({ onConfirmClick }) => event => {
    onConfirmClick(event);
  },
  handleCancel: ({ onCancelClick }) => event => {
    onCancelClick(event);
  },
  handleClose: ({ onCloseClick }) => event => {
    onCloseClick(event);
  },
  handleOverlayClick: ({ onOverlayClick }) => event => {
    onOverlayClick(event);
  }
});

const ConfirmModalBox = compose(
  withEventHandlers,
  pure
)(renderConfirmModalBox);

ConfirmModalBox.propTypes = {
  id: T.string,
  isOpen: T.bool,
  message: T.string,
  onConfirmClick: T.func,
  onCancelClick: T.func,
  onOverlayClick: T.func,
  onCloseClick: T.func,
  cancelLabel: T.string,
  confirmLabel: T.string
};

ConfirmModalBox.defaultProps = {
  id: "",
  isOpen: false,
  message: "Are you sure?",
  onConfirmClick: noop,
  onCancelClick: noop,
  onOverlayClick: noop,
  onCloseClick: noop,
  cancelLabel: "No",
  confirmLabel: "Yes"
};

export default ConfirmModalBox;
