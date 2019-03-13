import React from "react";
import { compose, withHandlers, pure } from "recompose";
import { noop } from "lodash";
import T from "prop-types";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

const renderDateBox = ({
  id,
  name,
  handleOnChange = noop,
  value,
  placeholder
}) => {
  value = value.toString() !== "" ? moment.unix(value).toDate() : null;
  return (
    <div id={id} className="control control_datebox">
      <DatePicker
        name={name}
        placeholderText={placeholder}
        dateFormat="dd-MM-yyyy"
        todayButton={"Today"}
        selected={value}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        onChange={handleOnChange}
      />
    </div>
  );
};
const DateBox = compose(
  withHandlers({
    handleOnChange: ({ handleValueChange = noop }) => date => {
      let dateValue = date ? moment(date).unix() : "";
      handleValueChange(dateValue);
    }
  }),
  pure
)(renderDateBox);

DateBox.propTypes = {
  id: T.string,
  name: T.string,
  handleValueChange: T.func,
  value: T.string,
  placeholder: T.string
};

// Specifies the default values for props:
DateBox.defaultProps = {
  id: "",
  handleOnChange: noop,
  placeholder: "",
  value: ""
};

export default DateBox;
