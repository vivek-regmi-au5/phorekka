import {
  CLEAR_PROFILES,
  GET_PROFILES,
  PROFILE_ERRORS,
  GET_PROFILE,
  CLEAR_PROFILE,
  ADD_PRODUCT,
  GET_USER_PROFILE,
  SHOW_DISPLAY_PROFILE,
} from "./../actions/types";

const initialState = {
  loading: true,
  errors: null,
  profiles: null,
  profile: null,
  displayProfile: null,
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
        displayProfile: null,
      };

    case ADD_PRODUCT:
      return {
        ...state,
        profile: payload,
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
      };

    case SHOW_DISPLAY_PROFILE:
      return {
        ...state,
        displayProfile: state.profiles[payload],
      };
    case GET_PROFILES:
      return {
        ...state,
        loading: false,
        profiles: payload,
        errors: null,
        displayProfile: null,
      };

    case PROFILE_ERRORS:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    case GET_USER_PROFILE:
      return {
        ...state,
        profile: payload[0],
      };
    default:
      return state;
  }
};

export default profileReducer;
