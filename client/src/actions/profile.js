import {
  GET_PROFILES,
  CLEAR_PROFILES,
  PROFILE_ERRORS,
  CURRENT_PROFILE_ERRORS,
  GET_PROFILE,
  CLEAR_PROFILE,
} from "./types";
import axios from "axios";

// Get all profiles
export const getProfiles = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_PROFILES,
    });
    try {
      const res = await axios.get("http://localhost:9122/api/v1/profile");
      console.log("/actions/profile 11 ", res);
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERRORS,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

// Get current users profile
export const getCurrProfile = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_PROFILE,
    });
    try {
      const res = await axios.get(
        "http://localhost:9122/api/v1/profile/current"
      );
      console.log("/actions/profile 36 current profile ", res);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CURRENT_PROFILE_ERRORS,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};
