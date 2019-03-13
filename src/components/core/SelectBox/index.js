import React from "react";
import { compose, withHandlers, pure } from "recompose";
import _, { noop } from "lodash";
import T from "prop-types";

const renderSelectBox = ({
  id,
  name,
  value,
  handleOnChange,
  multiSelect,
  options = []
}) => {
  return (
    <div id={id} className="control control_selectbox">
      <select
        name={name}
        value={selectValue(multiSelect, value)}
        onChange={handleOnChange}
        multiple={multiSelect}
      >
        {options.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const SelectBox = compose(
  withHandlers({
    handleOnChange: ({ handleValueChange = noop }) => event => {
      var options = event.target.options;
      var newValues = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          newValues.push(options[i].value);
        }
      }
      handleValueChange(newValues);
    }
  }),
  pure
)(renderSelectBox);

SelectBox.propTypes = {
  id: T.string,
  name: T.string,
  handleValueChange: T.func,
  value: T.arrayOf(T.string),
  multiSelect: T.bool,
  options: T.arrayOf(
    T.shape({
      value: T.string,
      displayValue: T.string
    })
  )
};

// Specifies the default values for props:
SelectBox.defaultProps = {
  id: "",
  multiSelect: false,
  value: [],
  options: [],
  handleValueDChange: noop
};

export default SelectBox;

export const selectValue = (multiSelect, value) => {
  if (!multiSelect) {
    return _.first(value);
  } else return value;
};
