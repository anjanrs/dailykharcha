import React from "react";
import T from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Map, List } from "immutable";
import { noop } from "lodash";
import DataDetailRow from "../DataDetailRow";

const DataDetailBody = ({ fields, onEdit, editedData, validations }) => {
  return (
    <div className="detail__body">
      {fields.map(detailField => {
        let fieldName = detailField.get("field");
        return (
          <DataDetailRow
            key={`key-${fieldName}`}
            detailField={detailField}
            editValue={editedData.get(fieldName).toString()}
            onEdit={onEdit}
            invalidMsgs={validations.get(fieldName)}
          />
        );
      })}
    </div>
  );
};

DataDetailBody.propTypes = {
  fields: ImmutablePropTypes.list.isRequired,
  editedData: ImmutablePropTypes.map,
  validations: ImmutablePropTypes.map,
  onEdit: T.func
};

DataDetailBody.defaultProps = {
  fields: List(),
  editedData: Map(),
  validations: Map(),
  onEdit: noop
};

export default DataDetailBody;
