import React from "react";
import { compose, withHandlers, pure } from "recompose";
import _, { noop } from "lodash";
import T from "prop-types";

const renderCheckBox = ({ id, name, value, handleOnChange, options = [] }) => {
  return (
    <div id={id} className="control_checkbox">
      {options.map(option => (
        <label key={option.value}>
          <input
            name={name}
            type="checkbox"
            value={option.value}
            checked={shouldChecked(option.value, value)}
            onChange={handleOnChange}
          />
          <span>{option.displayValue}</span>
        </label>
      ))}
    </div>
  );
};

const CheckBox = compose(
  withHandlers({
    handleOnChange: ({ value, handleValueChange = noop }) => ({ target }) => {
      const newValue = target.value;
      const checked = target.checked;
      //assign removed items to newValues
      let newValues = _.remove(value, oldValue => {
        return oldValue !== newValue;
      });
      if (checked) {
        newValues.push(newValue);
      }
      handleValueChange(newValues);
    }
  }),
  pure
)(renderCheckBox);

CheckBox.propTypes = {
  id: T.string,
  name: T.string,
  handleValueChange: T.func,
  value: T.arrayOf(T.string),
  options: T.arrayOf(
    T.shape({
      value: T.string,
      displayValue: T.string
    })
  )
};

// Specifies the default values for props:
CheckBox.defaultProps = {
  id: "",
  handleValueChange: noop,
  options: [],
  value: []
};

export default CheckBox;

export const shouldChecked = (optionValue = "", value = []) => {
  return _.includes(value, optionValue);
};
