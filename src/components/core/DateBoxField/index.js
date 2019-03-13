import T from "prop-types";
import DateBox from "../DateBox";
import withFieldHandler from "../../../decorators/withFieldHandler";

const DateBoxField = withFieldHandler(DateBox);
DateBoxField.propTypes = {
  name: T.string,
  onValueChange: T.func,
  value: T.string,
  field: T.string
};

export default DateBoxField;
