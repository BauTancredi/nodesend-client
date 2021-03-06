import React, { useReducer } from "react";

import authContext from "./authContext";
import authReducer from "./authReducer";

import {
  AUTHENTICATED_USER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  CLEAN_ALERT,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../../types";

import clientAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

const AuthState = ({ children }) => {
  // Initial State
  const initialState = {
    token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
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
  const login = async (data) => {
    try {
      const response = await clientAxios.post("/api/auth", data);

      disptach({
        type: LOGIN_SUCCESS,
        payload: response.data.token,
      });
    } catch (error) {
      disptach({
        type: LOGIN_ERROR,
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

  // Authenticated user
  const authenticatedUser = async () => {
    const token = localStorage.getItem("token");
    if (token) tokenAuth(token);

    try {
      const response = await clientAxios.get("/api/auth");

      if (response.data.user) {
        disptach({
          type: AUTHENTICATED_USER,
          payload: response.data.user,
        });
      }
    } catch (error) {
      disptach({
        type: LOGIN_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  const logout = () => {
    disptach({
      type: LOGOUT,
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
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
