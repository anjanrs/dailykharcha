import React from "react";
import { compose, withHandlers, pure } from "recompose";
import { noop } from "lodash";
import T from "prop-types";

const renderTextArea = ({
  id,
  name,
  handleOnKeyUp = noop,
  handleOnChange = noop,
  value,
  placeholder
}) => {
  return (
    <div id={id} className="control control_textarea">
      <textarea
        name={name}
        value={value}
        onChange={handleOnChange}
        onKeyUp={handleOnKeyUp}
        placeholder={placeholder}
      />
    </div>
  );
};

const withEventHandlers = withHandlers({
  handleOnChange: ({ handleValueChange = noop }) => event => {
    handleValueChange(event.target.value);
  },
  handleOnKeyUp: ({ onKeyUp = noop }) => event => {
    if (event.keyCode === 13) {
      onKeyUp(event);
    }
  }
});
const TextArea = compose(
  withEventHandlers,
  pure
)(renderTextArea);

TextArea.propTypes = {
  id: T.string,
  name: T.string,
  handleValueChange: T.func,
  onKeyUp: T.func,
  value: T.string,
  placeholder: T.string
};

// Specifies the default values for props:
TextArea.defaultProps = {
  id: "",
  handleValueChange: noop,
  onKeyUp: noop,
  value: "",
  placeholder: ""
};

export default TextArea;
