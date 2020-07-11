import {
  GET_PRODUCTS,
  CLEAR_PRODUCTS,
  PRODUCT_ERRORS,
  CLEAR_PROFILES,
  FILTER_PRODUCTS,
  CATEGORY_FILTER_PRODUCTS,
} from "./types";
import axios from "axios";

// Get all PRODUCTs
export const getProducts = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_PRODUCTS,
    });
    try {
      const res = await axios.get("http://localhost:9122/api/v1/product");

      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_ERRORS,
        payload: err,
      });
    }
  };
};

// Filter products based on genderFilter
export const filterProducts = (genderFilter, categoryFilter) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FILTER_PRODUCTS,
        payload: { genderFilter: genderFilter, categoryFilter: categoryFilter },
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_ERRORS,
        payload: err,
      });
    }
  };
};
