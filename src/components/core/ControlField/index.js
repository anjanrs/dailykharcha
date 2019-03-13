import React from "react";
import T from "prop-types";

import TextBoxField from "../TextBoxField";
import TextAreaField from "../TextAreaField";
import CheckBoxField from "../CheckBoxField";
import SelectBoxField from "../SelectBoxField";
import DateBoxField from "../DateBoxField";
import RadioButtonField from "../RadioButtonField";
import LabelField from "../LabelField";
import Link from "../Link";

const ControlField = props => {
  const renderControlType = {
    selectbox: <SelectBoxField {...props} value={props.value.split(",")} />,
    checkbox: <CheckBoxField {...props} value={props.value.split(",")} />,
    radiobutton: <RadioButtonField {...props} value={props.value.split(",")} />,
    textarea: <TextAreaField {...props} />,
    textbox: <TextBoxField {...props} />,
    datebox: <DateBoxField {...props} />,
    label: <LabelField {...props} />,
    link: <Link {...props} />
  };

  if (renderControlType[props.type]) return renderControlType[props.type];
  else return "";
};

ControlField.propTypes = {
  name: T.string,
  value: T.string,
  field: T.string,
  onValueChange: T.func,
  options: T.array,
  multiSelect: T.bool,
  width: T.string,
  placeholder: T.string,
  type: T.string
};

export default ControlField;
