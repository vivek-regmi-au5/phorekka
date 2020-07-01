import { LIST_PRODUCT_FOR_CROWDFUNDING, LISTING_ERRORS } from "./types";
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
        type: LIST_PRODUCT_FOR_CROWDFUNDING,
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
