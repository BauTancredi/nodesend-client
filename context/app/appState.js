import React, { useReducer } from "react";
import appContext from "./appContext";
import appReducer from "./appReducer";

import clientAxios from "../../config/axios";

import {
  SHOW_ALERT,
  CLEAN_ALERT,
  UPLOAD_FILE,
  UPLOAD_FILE_ERROR,
  UPLOAD_FILE_SUCCESS,
  CREATE_LINK_ERROR,
  CREATE_LINK_SUCCESS,
} from "../../types";

const AppState = ({ children }) => {
  const initialState = {
    message_file: null,
    name: "",
    original_name: "",
    loading: "",
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

  // Upload file to server
  const uploadFile = async (formData, fileName) => {
    dispatch({
      type: UPLOAD_FILE,
    });
    try {
      const result = await clientAxios.post("/api/files", formData);

      dispatch({
        type: UPLOAD_FILE_SUCCESS,
        payload: { name: result.data.file, original_name: fileName },
      });
    } catch (error) {
      dispatch({
        type: UPLOAD_FILE_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  return (
    <appContext.Provider
      value={{
        message_file: state.message_file,
        name: state.name,
        original_name: state.original_name,
        loading: state.loading,
        showAlert,
        uploadFile,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppState;
