import validator from "validator";
const hasNoValue = value => {
  if (value === null || value === undefined || value.toString().trim() === "")
    return true;
  else return false;
};
const isInt = (value, options) => {
  if (hasNoValue(value)) return true;
  if (typeof options === "object" && options !== null) {
    return validator.isInt(value.toString(), { ...options });
  } else {
    //return with defaut options
    return validator.isInt(value.toString());
  }
};

const isDecimal = (value, options) => {
  if (hasNoValue(value)) return true;
  if (typeof options === "object" && options !== null) {
    return validator.isDecimal(value.toString(), { ...options });
  } else {
    //return with defaut options
    return validator.isDecimal(value.toString());
  }
};

const isEmail = value => {
  if (hasNoValue(value)) return true;
  return validator.isEmail(value.toString());
};
const isRequired = value => {
  return value && !validator.isEmpty(value.toString().trim());
};

const maxLength = (value, length) => {
  if (value && value.toString().length > length) {
    return false;
  }
  return true;
};

const minLength = (value, length) => {
  if (value && value.toString().length < length) {
    return false;
  }
  return true;
};

const isDate = value => {
  return true;
};

export default {
  isInt,
  isEmail,
  isRequired,
  maxLength,
  minLength,
  isDate,
  isDecimal
};

export const getValidationMsg = (validationType, metaData = "") => {
  const validationMsg = {
    isDecimal: "Invalid Decimal",
    isInt: "Invalid Integer",
    isEmail: "Invalid Email",
    isRequired: "Cannot be empty",
    maxLength: "Exceded max length: " + metaData.toString(),
    minLength: "Must min length: " + metaData.toString(),
    isDate: "Invalid Date"
  };
  return validationMsg[validationType];
};
