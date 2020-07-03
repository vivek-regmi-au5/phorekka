import { LISTING_ERRORS, ADD_PRODUCT } from "./types";
import axios from "axios";

// Add product to list
export const addProductForCrowdFund = (product_id) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        "http://localhost:9122/api/v1/profile/listed",
        { listed: product_id }
      );
      console.log("response at addding product: ", res);
      dispatch({
        type: ADD_PRODUCT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LISTING_ERRORS,
        payload: { msg: err, status: err.response.status },
      });
    }
  };
};

// Add product to list
export const productDetail = (index) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_PRODUCT",
        payload: index,
      });
    } catch (err) {
      dispatch({
        type: LISTING_ERRORS,
        payload: err,
      });
    }
  };
};
