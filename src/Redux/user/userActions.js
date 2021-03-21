export const FETCH_USER = "FETCH_USER";
export const SET_TOKEN = "SET_TOKEN";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const DELETE_TOKEN = "DELETE_TOKEN";

export const fetch_user = (data) => {
  return { type: FETCH_USER, payload: data };
};
export const set_token = () => {
  return { type: SET_TOKEN };
};
export const set_loading = (value) => {
  return { type: SET_LOADING, payload: value };
};
export const set_error = (error) => {
  return { type: SET_ERROR, payload: error };
};
export const delete_token = () => {
  return { type: DELETE_TOKEN };
};
