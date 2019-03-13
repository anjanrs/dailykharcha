import { fromJS } from "immutable";
// const sorts = fromJS([{ field: "id", orderBy: "DESC" }]);
export default fromJS([
  {
    label: "Menu Label",
    field: "label",
    operator: "like",
    value: "",
    type: "textbox"
  }
]);
