import api from "./api";

export const getUserGroupsOptions = (forField = "usergroup_id") => {
  return api.post({ params: {}, endpoint: "getUserGroups" }).then(response => {
    let options = [];
    if (response.success) {
      options = response.results.data;
      options = options.map(userGroup => {
        return {
          value: userGroup.id.toString(),
          displayValue: userGroup.name.toString()
        };
      });
    }
    return { optionsForField: forField, options };
  });
};

export const getAccessTypesOptions = (forField = "access_type_id") => {
  return api.post({ params: {}, endpoint: "getAccessTypes" }).then(response => {
    let options = [];
    if (response.success) {
      options = response.results.data;
      options = options.map(accessType => {
        return {
          value: accessType.id.toString(),
          displayValue: accessType.type.toString()
        };
      });
    }
    return { optionsForField: forField, options };
  });
};

export const getMenuItemOptions = (forField = "menuitem_id") => {
  return api.post({ params: {}, endpoint: "getMenuItems" }).then(response => {
    let options = [];
    if (response.success) {
      options = response.results.data;
      options = options.map(menuItem => {
        return {
          value: menuItem.id.toString(),
          displayValue: menuItem.label.toString()
        };
      });
    }
    return { optionsForField: forField, options };
  });
};

export const getExpenseTypeOptions = (forField = "expense_type_id") => {
  return api
    .post({ params: {}, endpoint: "getExpenseTypes" })
    .then(response => {
      let options = [];
      if (response.success) {
        options = response.results.data;
        options = options.map(expenseType => {
          return {
            value: expenseType.id.toString(),
            displayValue: expenseType.name.toString()
          };
        });
      }
      return { optionsForField: forField, options };
    });
};

export const getMainExpenseTypeOptions = (forField = "expense_type_id") => {
  return api
    .post({ params: {}, endpoint: "getMainExpenseTypes" })
    .then(response => {
      let options = [];
      if (response.success) {
        options = response.results;
        options = options.map(expenseType => {
          return {
            value: expenseType.id.toString(),
            displayValue: expenseType.name.toString()
          };
        });
      }
      return { optionsForField: forField, options };
    });
};

export const getSubExpenseTypeOptions = (forField = "sub_expense_type_id") => {
  return api
    .post({ params: {}, endpoint: "getSubExpenseTypes" })
    .then(response => {
      let options = [];
      if (response.success) {
        options = response.results;
        options = options.map(expenseType => {
          return {
            value: expenseType.id.toString(),
            displayValue: expenseType.name.toString()
          };
        });
      }
      return { optionsForField: forField, options };
    });
};

export const getUnitOptions = (forField = "unit_id") => {
  return api.post({ params: {}, endpoint: "getUnits" }).then(response => {
    let options = [];
    if (response.success) {
      options = response.results.data;
      options = options.map(unit => {
        return {
          value: unit.id.toString(),
          displayValue: unit.name.toString()
        };
      });
    }
    return { optionsForField: forField, options };
  });
};

export const getStoreOptions = (forField = "store_id") => {
  return api.post({ params: {}, endpoint: "getStores" }).then(response => {
    let options = [];
    if (response.success) {
      options = response.results.data;
      options = options.map(store => {
        return {
          value: store.id.toString(),
          displayValue: store.name.toString()
        };
      });
    }
    return { optionsForField: forField, options };
  });
};
