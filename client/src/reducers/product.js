import {
  GET_PRODUCTS,
  PRODUCT_ERRORS,
  GET_PRODUCT,
  CLEAR_PRODUCTS,
} from "./../actions/types";

const initialState = {
  products: null,
  product: null,
  errors: null,
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CLEAR_PRODUCTS:
      return {
        ...state,
        loading: false,
        errors: null,
        products: null,
      };

    case GET_PRODUCTS:
      return {
        ...state,
        loading: false,
        products: payload,
        errors: null,
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
    default:
      return state;
  }
};

export default productReducer;
