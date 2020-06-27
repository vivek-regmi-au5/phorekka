import {
  CLEAR_PROFILES,
  GET_PROFILES,
  PROFILE_ERRORS,
  GET_PROFILE,
} from "./../actions/types";

const initialState = {
  loading: true,
  errors: null,
  profiles: null,
  profile: null,
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CLEAR_PROFILES:
      return {
        ...state,
        loading: false,
        errors: null,
        profiles: null,
      };

    case GET_PROFILES:
      return {
        ...state,
        loading: false,
        profiles: payload,
        errors: null,
      };

    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        errors: null,
        profile: state.profiles[payload],
      };

    case PROFILE_ERRORS:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
