import T from "prop-types";
import SelectBox from "../SelectBox";
import withFieldHandler from "../../../decorators/withFieldHandler";

const SelectBoxField = withFieldHandler(SelectBox);
SelectBoxField.propTypes = {
  name: T.string,
  onValueChange: T.func,
  value: T.arrayOf(T.string),
  field: T.string,
  multiSelect: T.bool,
  options: T.arrayOf(
    T.shape({
      value: T.string,
      displayValue: T.string
    })
  )
};

export default SelectBoxField;
