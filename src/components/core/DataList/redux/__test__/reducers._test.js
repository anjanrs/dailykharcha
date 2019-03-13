import datalistReducer, { datalistActionTypes } from "./";

it("handles action of type LIST_INIT", () => {
  const action = {
    type: datalistActionTypes.LIST_INIT,
    listName: "testlist",
    namespace: "dataList",
    payload: {}
  };
});
