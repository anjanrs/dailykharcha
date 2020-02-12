// make the api file common so we can pass the header
// or create a middle ware for axios to pass the header
import axios from "axios";
import { empty } from "apollo-link";
const apiUrl = "http://localhost:3090/";

export default {
  post: ({ params, endpoint }) => {
    axios.defaults.withCredentials = true;
    if(!empty(localStorage.getItem("authenticity_token"))) {
      axios.defaults.headers.common["authenticity_token"] = localStorage.getItem("authenticity_token");
    }
    return axios.post(apiUrl + endpoint, params).then(res => {
      if(res.headers.authenticity_token) {
        localStorage.setItem("authenticity_token",res.headers.authenticity_token);
      }
      return res.data
    });
  }
};
