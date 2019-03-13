import React from "react";
import T from "prop-types";
import { compose, withHandlers } from "recompose";
import { noop } from "lodash";
import ImmutablePropTypes from "react-immutable-proptypes";

import ControlField from "../../ControlField";
import ValidationMsgs from "../../ValidationMsgs";
import { List } from "immutable";

const renderDataDetailRow = ({
  detailField,
  editValue,
  onFieldValueChange,
  invalidMsgs
}) => {
  const { title, field, editControl } = detailField.toJS();

  if (!editControl) return null;
  else
    return (
      <div className="detail__row">
        <div className="detail__field-label">{title}</div>
        <div className="detail__field-control">
          <ControlField
            {...editControl}
            onValueChange={onFieldValueChange}
            name={`edit-${field}`}
            value={editValue}
            field={field}
          />
          {invalidMsgs && invalidMsgs.size > 0 && (
            <ValidationMsgs messages={invalidMsgs.toJS()} />
          )}
        </div>
      </div>
    );
};
const DataDetailRow = compose(
  withHandlers({
    onFieldValueChange: ({ onEdit }) => (field, newValue) => {
      onEdit(field, newValue);
    }
  })
)(renderDataDetailRow);

DataDetailRow.propTypes = {
  detailField: ImmutablePropTypes.map.isRequired,
  editValue: T.string,
  onEdit: T.func,
  invalidMsgs: ImmutablePropTypes.list
};
DataDetailRow.defaultProps = {
  editValue: "",
  onEdit: noop,
  invalidMsgs: List()
};
export default DataDetailRow;
