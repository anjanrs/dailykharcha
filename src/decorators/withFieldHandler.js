//withFieldhandler field name parameter to the on change handler
//which is triggered when value changes on textbox, selectbox or checkboxes,
//which only sends the new value but no field name
//field name needed when we add to list filter to associate the changed vaue to the
//field it is related to

import { compose, withHandlers } from "recompose";
import { noop } from "lodash";

const withFieldHandler = compose(
  withHandlers({
    handleValueChange: ({ field, onValueChange = noop }) => newValue => {
      onValueChange(field, newValue);
    }
  })
);

export default withFieldHandler;
