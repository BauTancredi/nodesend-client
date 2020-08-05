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
  return <appContext.Provider value={{}}>{children}</appContext.Provider>;
};

export default AppState;
