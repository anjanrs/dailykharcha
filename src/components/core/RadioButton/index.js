import React from "react";
import { compose, withHandlers, pure } from "recompose";
import _, { noop } from "lodash";
import T from "prop-types";

const renderRadioButton = ({
  id,
  name,
  value,
  handleOnChange,
  options = []
}) => {
  return (
    <div id={id} className="control control_radiobutton">
      {options.map(option => (
        <label key={option.value}>
          <input
            name={name}
            type="radio"
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

const RadioButton = compose(
  withHandlers({
    handleOnChange: ({ oldValue, handleValueChange = noop }) => ({
      target: { value, checked }
    }) => {
      let newValues = [];
      // let newValues = value;
      // newValues = _.remove(value, oldValue => {
      //   return oldValue !== value;
      // });
      if (checked) {
        newValues.push(value);
      }
      handleValueChange(newValues);
    }
    // handleOnChange: ({ value, handleValueChange = noop }) => ({ target }) => {
    //   const newValue = target.value;
    //   const checked = target.checked;
    //   //first remove from the newValues array
    //   let newValues = _.remove(value, oldValue => {
    //     return oldValue !== newValue;
    //   });
    //   //if
    //   if (checked) {
    //     newValues.push(newValue);
    //   }
    //   handleValueChange(newValues);
    // }
  }),
  pure
)(renderRadioButton);

RadioButton.propTypes = {
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
RadioButton.defaultProps = {
  id: "",
  handleValueChange: noop,
  options: [],
  value: []
};

export default RadioButton;

export const shouldChecked = (optionValue = "", value = []) => {
  return _.includes(value, optionValue);
};
