import React from "react";
import {
  compose,
  withHandlers,
  withState,
  withPropsOnChange,
  pure
} from "recompose";
import { noop } from "lodash";
import { fromJS } from "immutable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CmdButton from "../CmdButton";
import ControlField from "../ControlField";

const renderDataListFilter = ({
  newFilters,
  onFilterValueChange,
  handleFilterClick,
  handleFilterReset
}) => {
  return (
    <div className="list__filter">
      <div className="list_filter__controls-wrapper">
        {newFilters.map(filter => {
          filter = filter.toJS();
          return (
            <div key={filter["field"]} className="list__filter__control">
              <label className="list_filter--label">{filter["label"]}</label>
              <ControlField
                {...filter}
                name={filter["field"]}
                onValueChange={onFilterValueChange}
                onKeyUp={handleFilterClick}
                value={filter["value"].toString()}
              />
            </div>
          );
        })}
      </div>
      <div className="list-filter__btn_wrapper">
        <CmdButton
          active={true}
          type="search"
          onClickHandler={handleFilterClick}
        >
          <FontAwesomeIcon icon="search" />
          &nbsp;Search
        </CmdButton>
        <CmdButton
          active={true}
          type="search-reset"
          onClickHandler={handleFilterReset}
        >
          <FontAwesomeIcon icon="undo" />
          &nbsp;Reset
        </CmdButton>
      </div>
    </div>
  );
};

const DataListFilter = compose(
  withState("newFilters", "setFilters", ({ filters }) => {
    return filters;
  }),
  withPropsOnChange(["filters"], ({ filters, setFilters }) => {
    setFilters(filters);
    return {};
  }),
  withHandlers({
    onFilterValueChange: ({ newFilters, setFilters }) => (field, newValue) => {
      newFilters = newFilters.map(objFilter => {
        if (objFilter.get("field") === field) {
          return objFilter.set("value", fromJS(newValue));
        } else {
          return objFilter;
        }
      });
      setFilters(newFilters);
    },
    handleFilterClick: ({ newFilters, onFilter = noop }) => event => {
      onFilter(newFilters);
    },
    handleFilterReset: ({ newFilters, onFilter = noop }) => event => {
      newFilters = newFilters.map(objFilter => {
        return objFilter.set("value", objFilter.get("resetValue"));
      });
      onFilter(newFilters);
    }
  }),
  pure
)(renderDataListFilter);

export default DataListFilter;
