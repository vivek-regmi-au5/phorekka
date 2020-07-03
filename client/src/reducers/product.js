import {
  GET_PRODUCTS,
  PRODUCT_ERRORS,
  GET_PRODUCT,
  CLEAR_PRODUCTS,
  FILTER_PRODUCTS,
  CATEGORY_FILTER_PRODUCTS,
} from "./../actions/types";
import { categoryFilteredProducts } from "../actions/product";

const initialState = {
  products: null,
  product: null,
  errors: null,
  genderFilter: null,
  categoryFilter: null,
  filteredProducts: null,
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CLEAR_PRODUCTS:
      return {
        ...state,
        errors: null,
        products: null,
        product: null,
        genderFilter: null,
        filteredProducts: null,
      };

    case GET_PRODUCTS:
      return {
        ...state,
        loading: false,
        products: payload,
        errors: null,
        genderFilter: null,
        product: null,
        categoryFilter: null,
      };

    case GET_PRODUCT:
      return {
        ...state,
        loading: false,
        errors: null,
        product: state.products[payload],
      };

    case PRODUCT_ERRORS:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    case FILTER_PRODUCTS:
      if (!payload.categoryFilter) {
        return {
          ...state,
          loading: false,
          errors: null,
          genderFilter: payload.genderFilter,
          filteredProducts: state.products.filter(
            (product) =>
              product.whom === "all" || product.whom === payload.genderFilter
          ),
        };
      } else if (!payload.genderFilter) {
        return {
          ...state,
          categoryFilter: payload.categoryFilter,
          filteredProducts: state.products.filter(
            (product) => product.category === payload.categoryFilter
          ),
        };
      } else {
        return {
          ...state,
          categoryFilter: payload.categoryFilter,
          genderFilter: payload.genderFilter,
          filteredProducts: state.products.filter(
            (product) =>
              product.category === payload.categoryFilter &&
              (product.whom === "all" || product.whom === payload.genderFilter)
          ),
        };
      }

    default:
      return state;
  }
};

export default productReducer;
