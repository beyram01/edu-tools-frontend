import { FETCH_USER, SET_TOKEN } from "./userActions";
const initialState = {
  user: {
    username: "",
    email: "",
    token: "",
  },
  loading: false,
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      const { username, email, token } = action.payload;
      localStorage.setItem("access_token", token);
      return {
        ...state,
        user: { username: username, email: email, token: token },
      };
    case SET_TOKEN:
      const access_token = localStorage.getItem("access_token");

      return (
        access_token && {
          ...state,
          user: { ...state.user, token: access_token },
        }
      );
    default:
      return state;
  }
};

export default userReducer;
