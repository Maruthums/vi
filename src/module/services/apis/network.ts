import axios from "axios";
// import { getElement } from "utils/localStorage";

// let baseURL = process.env.REACT_APP_BASE_URL;
let baseURL = ''
const headers = {
  "Content-type": "application/json"
};

// const bearerToken = getElement('token');
// if (bearerToken) {
//   headers['Authorization'] = "Bearer " + bearerToken;
// }

const instance = axios.create({
  baseURL,
  headers
});

export default instance;
