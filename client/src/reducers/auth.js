import {
  AUTH_SIGN_UP,
  AUTH_SIGN_UP_ERROR,
  SIGN_OUT,
  AUTH_SIGN_IN,
} from "./../actions/types";

const DEFAULT_STATE = {
  isAuthenticated: false,
  token: "",
  errorMessage: "",
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case AUTH_SIGN_UP:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        errorMessage: "",
      };
    case AUTH_SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        errorMessage: "",
      };
    case AUTH_SIGN_UP_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        token: "",
        errorMessage: "",
      };

    default:
      return state;
  }
};
