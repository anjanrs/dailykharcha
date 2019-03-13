import T from "prop-types";
import TextArea from "../TextArea";
import withFieldHandler from "../../../decorators/withFieldHandler";

const TextAreaField = withFieldHandler(TextArea);

TextAreaField.propTypes = {
  name: T.string,
  onValueChange: T.func,
  value: T.string,
  onKeyUp: T.func,
  field: T.string,
  placeholder: T.string
};

export default TextAreaField;
