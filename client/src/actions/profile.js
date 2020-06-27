import { GET_PROFILES, CLEAR_PROFILES, PROFILE_ERRORS } from "./types";
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

// Get one profile profiles
export const getProfile = (id) => {
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
