import {
  GET_PROFILES,
  CLEAR_PROFILES,
  PROFILE_ERRORS,
  USER_PROFILE_ERROR,
  CLEAR_USER_PROFILE,
  GET_USER_PROFILE,
  LIST_CROWD_FUND_ITEMS,
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
        payload: err,
      });
    }
  };
};

// Get all profiles USED
export const getUserProfile = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_USER_PROFILE,
    });
    try {
      const res = await axios.get(
        "http://localhost:9122/api/v1/profile/current"
      );
      console.log("current user profile data ", res);
      dispatch({
        type: GET_USER_PROFILE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_PROFILE_ERROR,
        payload: err,
      });
    }
  };
};

// Get all crowdfund items related to the profile
export const getCrowdFundedProducts = (profileId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `http://localhost:9122/api/v1/crowdFund/${profileId}`
      );
      console.log("crowdFunded items ", res);
      dispatch({
        type: LIST_CROWD_FUND_ITEMS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
