import React, { useReducer } from "react";

import authContext from "./authContext";
import authReducer from "./authReducer";

import { AUTHENTICATED_USER } from "../../types";

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
  const registerUser = (data) => {
    console.log("From registerUser");
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
