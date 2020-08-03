import React, { useReducer } from "react";

import authContext from "./authContext";
import authReducer from "./authReducer";

import { AUTHENTICATED_USER } from "../../types";

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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
