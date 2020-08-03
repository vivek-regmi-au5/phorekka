import {
  GET_PROFILES,
  CLEAR_PROFILES,
  PROFILE_ERRORS,
  USER_PROFILE_ERROR,
  CLEAR_USER_PROFILE,
  GET_USER_PROFILE,
  LIST_CROWD_FUND_ITEMS,
  LIST_CROWD_FUND_ITEMS_FOR_DISPLAY_PROFILE,
  PROFILE_FORM_SUBMIT,
  DELETE_CROWDFUNDED_ITEM,
} from "./types";
import axios from "axios";

// Get all profiles
export const getProfiles = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_PROFILES,
    });
    try {
      const res = await axios.get("/api/v1/profile");
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
      const res = await axios.get("/api/v1/profile/current");
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
      const res = await axios.get(`/api/v1/crowdFund/${profileId}`);
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

// Get all crowdfund items related to the display profile
export const getCrowdFundItemsForDisplayProfile = (profileId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/v1/crowdFund/${profileId}`);
      console.log("crowdFunded items wqefergrthrtgwefer", res);
      dispatch({
        type: LIST_CROWD_FUND_ITEMS_FOR_DISPLAY_PROFILE,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

// Handle form submit
export const handleFormSubmit = (data) => {
  return async (dispatch) => {
    try {
      const resp = await axios.post("/api/v1/profile", data);

      console.log("resppeddewef: ", resp);
      dispatch({
        type: PROFILE_FORM_SUBMIT,
        payload: resp.data.profile,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

// delete the funded item from crowd fund items list
export const deleteCrowdFundedItem = (productId, profileId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `/api/v1/crowdFund/${profileId}/${productId}`
      );
      console.log("is item deleted: ", res);
      dispatch({
        type: DELETE_CROWDFUNDED_ITEM,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
