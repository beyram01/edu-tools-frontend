export const FETCH_USER = "FETCH_USER";
export const SET_TOKEN = "SET_TOKEN";

export const fetch_user = (data) => {
  return { type: FETCH_USER, payload: data };
};
export const set_token = () => {
  return { type: SET_TOKEN };
};
