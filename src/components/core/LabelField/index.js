import T from "prop-types";
import Label from "../Label";
import withFieldHandler from "../../../decorators/withFieldHandler";

const LabelField = withFieldHandler(Label);
LabelField.propTypes = {
  name: T.string,
  value: T.string,
  field: T.string,
  title: T.string,
  onClick: T.func
};

export default LabelField;
