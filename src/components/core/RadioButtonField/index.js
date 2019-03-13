import T from "prop-types";
import RadioButton from "../RadioButton";
import withFieldHandler from "../../../decorators/withFieldHandler";

const RadioButtonField = withFieldHandler(RadioButton);

RadioButtonField.propTypes = {
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
export default RadioButtonField;
