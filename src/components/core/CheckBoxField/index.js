import T from "prop-types";
import CheckBox from "../CheckBox";
import withFieldHandler from "../../../decorators/withFieldHandler";

const CheckBoxField = withFieldHandler(CheckBox);

CheckBoxField.propTypes = {
  name: T.string,
  onValueChange: T.func,
  value: T.arrayOf(T.string),
  field: T.string,
  options: T.arrayOf(
    T.shape({
      value: T.string,
      displayValue: T.string
    })
  )
};
export default CheckBoxField;
