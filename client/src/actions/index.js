import axios from "axios";
import {
  AUTH_SIGN_UP,
  AUTH_SIGN_UP_ERROR,
  SIGN_OUT,
  AUTH_SIGN_IN,
  DASHBOARD_DATA,
  GET_PROFILE,
  CLEAR_PROFILE,
  CLEAR_PROFILES,
  CLEAR_PRODUCTS,
} from "./types";

export const signUp = (data) => {
  return async (dispatch) => {
    try {
      console.log("Data received at signup: ", data);
      const resp = await axios.post(
        "http://localhost:9122/api/v1/user/signup",
        data
      );
      dispatch({
        type: AUTH_SIGN_UP,
        payload: resp.data.token,
      });
      console.log("respie error: ", resp);
      localStorage.setItem("JWT_TOKEN", resp.data.token);
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
      console.log("we received: ", data);
      const res = await axios.post(
        "http://localhost:9122/api/v1/user/google/oauth",
        { access_token: data }
      );
      console.log("ress: ", res);
      if (!res.data.profile) {
        dispatch({
          type: AUTH_SIGN_UP,
          payload: res.data.token,
        });
      } else {
        dispatch({
          type: AUTH_SIGN_UP,
          payload: res.data.token,
        });
        dispatch({
          type: CLEAR_PROFILE,
        });
        dispatch({
          type: GET_PROFILE,
          payload: res.data.profile,
        });
      }

      localStorage.setItem("JWT_TOKEN", res.data.token);
      axios.defaults.headers.common["Authorization"] = res.data.token;
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
        { access_token: data }
      );
      console.log("Response after facebook signup/signin: ", res);
      console.log("ress: ", res);
      if (!res.data.profile) {
        dispatch({
          type: AUTH_SIGN_UP,
          payload: res.data.token,
        });
      } else {
        dispatch({
          type: AUTH_SIGN_UP,
          payload: res.data.token,
        });
        dispatch({
          type: CLEAR_PROFILE,
        });
        dispatch({
          type: GET_PROFILE,
          payload: res.data.profile,
        });
      }
      localStorage.setItem("JWT_TOKEN", res.data.token);
      axios.defaults.headers.common["Authorization"] = res.data.token;
    } catch (error) {
      console.log("error mmesaeg facebook: ", error);
    }
  };
};

export const signOut = (dispatch) => {
  return async (dispatch) => {
    localStorage.removeItem("JWT_TOKEN");
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
      console.log("res: ", res);
      if (!res.data.profile) {
        dispatch({
          type: AUTH_SIGN_UP,
          payload: res.data.token,
        });
      } else {
        dispatch({
          type: AUTH_SIGN_UP,
          payload: res.data.token,
        });
        dispatch({
          type: CLEAR_PROFILE,
        });
        dispatch({
          type: GET_PROFILE,
          payload: res.data.profile,
        });
      }

      localStorage.setItem("JWT_TOKEN", res.data.token);
      axios.defaults.headers.common["Authorization"] = res.data.token;
    } catch (error) {
      dispatch({
        type: AUTH_SIGN_UP_ERROR,
        payload: "Email password mismatch",
      });
    }
  };
};

export const getSecret = () => {
  return async (dispatch) => {
    try {
      console.log("Action trying to access secret route");
      const res = await axios.get("http://localhost:9122/api/v1/user/secret");
      console.log("get req res: ", res);
      dispatch({
        type: DASHBOARD_DATA,
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
