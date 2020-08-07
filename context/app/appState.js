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
  CLEAN_STATE,
  ADD_PASSWORD,
  ADD_DOWNLOADS,
} from "../../types";

const AppState = ({ children }) => {
  const initialState = {
    message_file: null,
    name: "",
    name_original: "",
    loading: null,
    downloads: 1,
    password: "",
    author: null,
    url: "",
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
        payload: { name: result.data.file, name_original: fileName },
      });
    } catch (error) {
      dispatch({
        type: UPLOAD_FILE_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  const createLink = async () => {
    const data = {
      name: state.name,
      name_original: state.name_original,
      downloads: state.downloads,
      password: state.password,
      author: state.author,
    };

    try {
      const result = await clientAxios.post("/api/links", data);

      dispatch({
        type: CREATE_LINK_SUCCESS,
        payload: result.data.msg,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const cleanState = () => {
    dispatch({
      type: CLEAN_STATE,
    });
  };

  const addPassword = (password) => {
    dispatch({
      type: ADD_PASSWORD,
      payload: password,
    });
  };

  const addDownloads = (downloads) => {
    dispatch({
      type: ADD_DOWNLOADS,
      payload: downloads,
    });
  };

  return (
    <appContext.Provider
      value={{
        message_file: state.message_file,
        name: state.name,
        name_original: state.name_original,
        loading: state.loading,
        downloads: state.downloads,
        password: state.password,
        author: state.author,
        url: state.url,
        showAlert,
        uploadFile,
        createLink,
        cleanState,
        addPassword,
        addDownloads,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppState;
