import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV !== "production"
      ? "http://localhost:1337"
      : "https://edu-tools.herokuapp.com",
  timeout: 5000,
});

export default instance;
