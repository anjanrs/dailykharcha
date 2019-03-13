import React from "react";
import T from "prop-types";

import "./style.scss";

const ValidationMsgs = ({ messages = [] }) => {
  if (messages && messages.length > 0) {
    return (
      <div className="validation-msgs">
        <ul>
          {messages.map((msg, index) => {
            return <li key={index}>{msg}</li>;
          })}
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

ValidationMsgs.propTypes = {
  messages: T.arrayOf(T.string)
};

ValidationMsgs.defaultProps = {
  messages: []
};

export default ValidationMsgs;
