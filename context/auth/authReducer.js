import {
  AUTHENTICATED_USER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  CLEAN_ALERT,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
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

    case CLEAN_ALERT:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};
