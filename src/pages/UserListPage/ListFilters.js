import { fromJS } from "immutable";
// const sorts = fromJS([{ field: "id", orderBy: "DESC" }]);
export default fromJS([
  {
    label: "Frst Name",
    field: "first_name",
    operator: "like",
    value: "",
    type: "textbox"
  }
]);
