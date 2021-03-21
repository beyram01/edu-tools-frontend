import api from "../axios.config";
import { useSelector } from "react-redux";

export const registerUser = async (data) => {
  const res = api.post("/auth/local/register", data);
  return res;
};
export const loginUser = async (data) => {
  const res = api.post("/auth/local", data);
  return res;
};
export const logoutUser = () => {
  localStorage.removeItem("access_token");
};

export const checkAuthentication = () => {
  const token = localStorage.getItem("access_token");
  return token ? true : false;
};
