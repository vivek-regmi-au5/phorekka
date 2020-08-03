import { LISTING_ERRORS, ADD_PRODUCT } from "./types";
import axios from "axios";

// Add product to list
export const addProductForCrowdFund = (productId, profileId) => {
  return async (dispatch) => {
    const res = await axios.post("/api/v1/crowdFund", {
      profileId,
      productId,
    });
    console.log("response at addding product: ", res);
  };
};

// Add product to list
export const productDetail = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_PRODUCT",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: LISTING_ERRORS,
        payload: err,
      });
    }
  };
};
