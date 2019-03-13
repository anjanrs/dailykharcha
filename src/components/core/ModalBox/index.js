import React from "react";
import { pure, compose } from "recompose";
import T from "prop-types";
import { noop } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CmdButton from "../CmdButton";
import "./style.scss";

const renderModalBox = ({
  id,
  isOpen,
  onCloseClick,
  onOverlayClick,
  children
}) => {
  if (!isOpen) return null;
  return (
    <div id={id} className="modal-box__wrapper">
      <div className="modal-box__overlay" onClick={onOverlayClick} />
      <div className="modal-box__content-wrapper">
        <CmdButton active={true} type="close" onClickHandler={onCloseClick}>
          <FontAwesomeIcon title="close" icon="times-circle" />
        </CmdButton>
        <div className="modal-box__content">{children}</div>
      </div>
    </div>
  );
};

const ModalBox = compose(pure)(renderModalBox);

ModalBox.propTypes = {
  id: T.string,
  isOpen: T.bool,
  onCloseClick: T.func,
  onOverlayClick: T.func
};

ModalBox.defaultProps = {
  id: "",
  isOpen: false,
  onCloseClick: noop,
  onOverlayClick: noop
};

export default ModalBox;
