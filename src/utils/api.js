// make the api file common so we can pass the header
// or create a middle ware for axios to pass the header
import axios from "axios";
const apiUrl = "http://localhost:3090/";

export default {
  post: ({ params, endpoint }) => {
    // axios.defaults.headers.common["authorization"] = localStorage.getItem(
    //   "token"
    // );
    return axios.post(apiUrl + endpoint, params).then(res => res.data);
  }
};
