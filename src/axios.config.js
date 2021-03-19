import axios from "axios";

const instance = axios.create({
  baseURL: "https://edu-tools.herokuapp.com",
  timeout: 5000,
});

export default instance;
