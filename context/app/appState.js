import React, { useReducer } from "react";
import appContext from "./appContext";
import appReducer from "./appReducer";

import {
  SHOW_ALERT,
  CLEAN_ALERT,
  UPLOAD_FILE_ERROR,
  UPLOAD_FILE_SUCCES,
  CREATE_LINK_ERROR,
  CREATE_LINK_SUCCESS,
} from "../../types";

const AppState = ({ children }) => {
  const initialState = {
    message_file: null,
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  const showAlert = (msg) => {
    dispatch({
      type: SHOW_ALERT,
      payload: msg,
    });

    setTimeout(() => {
      dispatch({
        type: CLEAN_ALERT,
        payload: msg,
      });
    }, 3000);
  };

  return (
    <appContext.Provider
      value={{ message_file: state.message_file, showAlert }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppState;
