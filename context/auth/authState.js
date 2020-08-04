import React, { useReducer } from "react";

import authContext from "./authContext";
import authReducer from "./authReducer";

import {
  AUTHENTICATED_USER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  CLEAN_ALERT,
} from "../../types";

import clientAxios from "../../config/axios";

const AuthState = ({ children }) => {
  // Initial State
  const initialState = {
    token: "",
    authenticated: null,
    user: null,
    message: null,
  };

  // Define reducer
  const [state, disptach] = useReducer(authReducer, initialState);

  // Register user
  const registerUser = async (data) => {
    try {
      const response = await clientAxios.post("/api/users", data);

      disptach({
        type: REGISTER_SUCCESS,
        payload: response.data.msg,
      });
    } catch (error) {
      disptach({
        type: REGISTER_ERROR,
        payload: error.response.data.msg,
      });
    }

    // Clean alert after 3 seconds
    setTimeout(() => {
      disptach({
        type: CLEAN_ALERT,
      });
    }, 3000);
  };

  // Login
  const login = (data) => {
    console.log(data);
  };

  // Authenticated user
  const authenticatedUser = (name) => {
    disptach({
      type: AUTHENTICATED_USER,
      payload: name,
    });
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        message: state.message,
        registerUser,
        authenticatedUser,
        login,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
