import {
  AUTHENTICATED_USER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  CLEAN_ALERT,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case REGISTER_ERROR:
    case LOGIN_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        token: action.payload,
        authenticated: true,
      };
    case AUTHENTICATED_USER:
      return {
        ...state,
        user: action.payload,
      };

    case CLEAN_ALERT:
      return {
        ...state,
        message: null,
      };

    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        authenticated: null,
      };
    default:
      return state;
  }
};
