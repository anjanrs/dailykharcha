import _ from "lodash";
import validate, { getValidationMsg } from "./validations";

export const validateItems = (toSaveItems = [], columns) => {
  let itemValidity = {};
  if (toSaveItems && toSaveItems.length > 0) {
    for (let objItem of toSaveItems) {
      let validationMsgs = validateItem(objItem, columns);
      let itemId = objItem["id"].toString();
      itemValidity[itemId] = {};
      itemValidity[itemId]["msgs"] = validationMsgs;
      itemValidity[itemId]["valid"] = !hasInvalidMsgs(validationMsgs);
    }
  }
  return itemValidity;
};

export const validateItem = (objItem, columns) => {
  let objItemInvalidMsgs = {};

  for (let column of columns) {
    if (column.field === "id") {
      continue;
    }
    const { field, editControl } = column;

    objItemInvalidMsgs[field] = [];

    if (editControl && editControl.validations) {
      objItemInvalidMsgs[field] = validateValue(
        objItem[field],
        editControl.validations
      );
    }
  }
  return objItemInvalidMsgs;
};

export const validateValue = (value, validations) => {
  let invalidMsgs = [];
  let validationTypes = _.keys(validations);
  for (let validationType of validationTypes) {
    if (validations[validationType]) {
      //call validate function as per validation type
      //check if the validation function exists before calling the function
      if (
        validate[validationType] &&
        !validate[validationType](value, validations[validationType])
      ) {
        invalidMsgs.push(
          getValidationMsg(validationType, validations[validationType])
        );
      }
    }
  }
  return invalidMsgs;
};

export const hasInvalidMsgs = validationMsgs => {
  if (!validationMsgs) return false;
  for (let key of _.keys(validationMsgs)) {
    if (validationMsgs[key].length > 0) {
      return true;
    }
  }
  return false;
};
