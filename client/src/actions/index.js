import axios from "axios";

import {
  AUTH_SIGN_UP,
  AUTH_SIGN_UP_ERROR,
  SIGN_OUT,
  AUTH_SIGN_IN,
  GET_PROFILE,
  CLEAR_PROFILE,
  CLEAR_PROFILES,
  CLEAR_PRODUCTS,
  GET_USER_PROFILE,
  SET_ALERT,
  REMOVE_ALERT,
} from "./types";

export const setAlert = (msg, alertType) => {
  return async (dispatch) => {
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
  };
};

export const signUp = (data) => {
  return async (dispatch) => {
    try {
      console.log("Data received at signup: ", data);
      const resp = await axios.post(
        "http://localhost:9122/api/v1/user/signup",
        data
      );
      console.log("ress at local check: ", resp);

      dispatch({
        type: AUTH_SIGN_UP,
        payload: resp.data.token,
      });
      console.log("respie error: ", resp);
      await localStorage.setItem("JWT_TOKEN", resp.data.token);
      axios.defaults.headers.common["Authorization"] = resp.data.token;
    } catch (error) {
      console.error("have a look at error: ", error);
      dispatch({
        type: AUTH_SIGN_UP_ERROR,
        payload: "Email already exists, try another email",
      });
    }
  };
};

export const oauthGoogle = (data) => {
  return async (dispatch) => {
    try {
      console.log("we received at oauth: ", data);
      const res = await axios.post(
        "http://localhost:9122/api/v1/user/google/oauth",
        { access_token: data.accessToken }
      );
      console.log("ress at google check: ", res);

      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data,
      });

      await localStorage.setItem("JWT_TOKEN", res.data);
      axios.defaults.headers.common["Authorization"] = res.data;
    } catch (error) {
      console.log("error mmesaeg: ", error);
    }
  };
};

export const oauthFacebook = (data) => {
  return async (dispatch) => {
    try {
      console.log("we received facebook: ", data);
      const res = await axios.post(
        "http://localhost:9122/api/v1/user/facebook/oauth",
        { access_token: data.accessToken }
      );
      console.log("ress at facebook check: ", res);

      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data,
      });

      await localStorage.setItem("JWT_TOKEN", res.data);
      axios.defaults.headers.common["Authorization"] = res.data;
    } catch (error) {
      console.log("error mmesaeg facebook: ", error);
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    await localStorage.removeItem("JWT_TOKEN");

    axios.defaults.headers.common["Authorization"] = "";
    dispatch({
      type: SIGN_OUT,
    });
    dispatch({
      type: CLEAR_PROFILE,
    });
    dispatch({
      type: CLEAR_PROFILES,
    });
    dispatch({
      type: CLEAR_PRODUCTS,
    });
  };
};

export const signIn = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        "http://localhost:9122/api/v1/user/signin",
        data
      );
      console.log("res at signin: ", res);

      dispatch({
        type: AUTH_SIGN_IN,
        payload: res.data,
      });

      await localStorage.setItem("JWT_TOKEN", res.data);
      axios.defaults.headers.common["Authorization"] = res.data;
    } catch (error) {
      dispatch({
        type: AUTH_SIGN_UP_ERROR,
        payload: "Email password mismatch",
      });
    }
  };
};
