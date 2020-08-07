import {
  SHOW_ALERT,
  CLEAN_ALERT,
  UPLOAD_FILE,
  UPLOAD_FILE_ERROR,
  UPLOAD_FILE_SUCCESS,
  CREATE_LINK_ERROR,
  CREATE_LINK_SUCCESS,
  CLEAN_STATE,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        message_file: action.payload,
      };
    case CLEAN_ALERT:
      return {
        ...state,
        message_file: null,
      };
    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        name_original: action.payload.name_original,
        loading: null,
      };
    case UPLOAD_FILE_ERROR:
      return {
        ...state,
        message_file: action.payload,
        loading: null,
      };
    case UPLOAD_FILE:
      return {
        ...state,
        loading: true,
      };
    case CREATE_LINK_SUCCESS:
      return {
        ...state,
        url: action.payload,
      };
    case CLEAN_STATE:
      return {
        ...state,
        message_file: null,
        name: "",
        name_original: "",
        loading: null,
        downloads: 1,
        password: "",
        author: null,
        url: "",
      };
    default:
      return state;
  }
};
