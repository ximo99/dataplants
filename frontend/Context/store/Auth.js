// import dependencies
import React, { useEffect, useReducer, useState } from "react";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import data
import AuthReducer from "../reducers/Auth.reducer";
import AuthGlobal from "./AuthGlobal";

// import action types
import { setCurrentUser } from "../actions/Auth.actions";

const Auth = (props) => {
  // setting initial state with useReducer
  const [stateUser, dispatch] = useReducer(AuthReducer, {
    isAuthenticated: null,
    user: {},
  });

  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);

    // getting the jwt from AsyncStorage
    if (AsyncStorage.jwt) {
      const decoded = AsyncStorage.jwt
        ? AsyncStorage.jwt
        : "";

      // dispatching the setCurrentUser action
      if (setShowChild) {
        dispatch(setCurrentUser(jwt_decode(decoded)));
      }
    }

    // cleanup function to set showChild to false
    return () => setShowChild(false);
  }, []);

  // checking if showChild is true and returning the AuthGlobal.Provider component with the props.children
  if (!showChild) {
    return null;
  } else {
    return (
      <AuthGlobal.Provider
        value={{
          stateUser,
          dispatch,
        }}
      >
        {props.children}
      </AuthGlobal.Provider>
    );
  }
};

export default Auth;
