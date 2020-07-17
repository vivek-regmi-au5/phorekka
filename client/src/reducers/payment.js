import { PAYMENT_INITIATED } from "./../actions/types";
const initialState = {
  product: null,
  payment: null,
};

const paymentReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case PAYMENT_INITIATED:
      return {
        ...state,
        product: payload,
      };

    default:
      return state;
  }
};

export default paymentReducer;
