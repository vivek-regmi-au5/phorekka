import {
  GET_PROFILE,
  CLEAR_PROFILE,
  CURRENT_PROFILE_ERRORS,
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
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: true,
      };
    case CURRENT_PROFILE_ERRORS:
      return {
        ...state,
        errors: payload,
        profile: null,
        loading: true,
      };
    default:
      return state;
  }
};

export default currentProfileReducer;
