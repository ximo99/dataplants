// import dependencies
import React from "react";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "native-base";

// import data
import baseURL from "../../assets/common/baseUrl";

// defining action types
export const SET_CURRENT_USER = "SET_CURRENT_USER";

// define function to login user
export const loginUser = (user, dispatch, setError) => {
  // make API call to login endpoint with user data
  fetch(`${baseURL}users/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // if response contains token, store it in AsyncStorage and set current user
      if (data) {
        const token = data.token;
        AsyncStorage.setItem("jwt", token);
        //.then(() => {
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
        //})
        //.catch((err) => console.log(err));
      } else {
        // if response doesn't contain token, set error
        logOutUser(dispatch);
        //setError("Please provide correct credentials.");
      }
    })
    .catch((err) => {
      console.log(err);
      Toast.show({
        title: "Error",
        text: "Please provide correct credentials.",
        type: "danger",
        duration: 3000,
      });
    });

  logOutUser(dispatch);
};

// getUserProfile function definition which fetches user profile details
export const getUserProfile = (id) => {
  fetch(`${baseURL}users/${id}`),
    {
      method: "GET",
      body: JSON.stringify(user),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
      .then((res) => res.json())
      .then((data) => console.log(data));
};

// define function to log out user
export const logOutUser = (dispatch) => {
  AsyncStorage.removeItem("jwt");
  dispatch(setCurrentUser({}));
};

// define function to set current user
export const setCurrentUser = (decoded, user) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    userProfile: user,
  };
};
