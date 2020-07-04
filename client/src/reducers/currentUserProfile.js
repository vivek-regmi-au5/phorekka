import {
  GET_PROFILE,
  CLEAR_PROFILE,
  CURRENT_PROFILE_ERRORS,
  ADD_PRODUCT,
  LISTING_ERRORS,
  SHOW_DISPLAY_PROFILE,
} from "./../actions/types";

const initialState = {
  profile: null,
  loading: true,
  errors: null,
};

const currentProfileReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
        errors: null,
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
        errors: null,
      };
    case CURRENT_PROFILE_ERRORS:
      return {
        ...state,
        errors: payload,
        profile: null,
        loading: false,
      };

    case LISTING_ERRORS:
      return {
        ...state,
        errors: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default currentProfileReducer;
