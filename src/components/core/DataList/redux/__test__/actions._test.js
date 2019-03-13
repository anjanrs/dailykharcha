import { datalistActions, datalistActionTypes } from "..";

describe("fetchDataAction", () => {
  it("has the correct type", () => {
    const action = datalistActions.fetchDataAction();
    expect(action.type).toEqual(datalistActionTypes.LIST_FETCH_DATA_REQUEST);
  });

  it("has the correct payload", () => {
    const action = datalistActions.fetchDataAction();
    expect(action.payload).toEqual();
  });
});
