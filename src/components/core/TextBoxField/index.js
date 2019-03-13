import T from "prop-types";
import TextBox from "../TextBox";
import withFieldHandler from "../../../decorators/withFieldHandler";

const TextBoxField = withFieldHandler(TextBox);

TextBoxField.propTypes = {
  name: T.string,
  onValueChange: T.func,
  value: T.string,
  onKeyUp: T.func,
  field: T.string,
  placeholder: T.string
};

export default TextBoxField;
