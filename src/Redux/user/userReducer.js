import {
  FETCH_USER,
  SET_TOKEN,
  DELETE_TOKEN,
  SET_LOADING,
  SET_ERROR,
} from "./userActions";
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

      return access_token
        ? {
            ...state,
            user: { username: "", email: "", token: access_token },
          }
        : state;

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_TOKEN:
      localStorage.removeItem("access_token");
      return { ...state, user: { username: "", email: "", token: "" } };
    default:
      return state;
  }
};

export default userReducer;
