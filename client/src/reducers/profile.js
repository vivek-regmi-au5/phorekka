import {
  CLEAR_PROFILES,
  GET_PROFILES,
  PROFILE_ERRORS,
  GET_PROFILE,
  CLEAR_PROFILE,
  ADD_PRODUCT,
  GET_USER_PROFILE,
  SHOW_DISPLAY_PROFILE,
  USER_PROFILE_ERROR,
  CLEAR_USER_PROFILE,
  LIST_CROWD_FUND_ITEMS,
  LIST_CROWD_FUND_ITEMS_FOR_DISPLAY_PROFILE,
  PROFILE_FORM_SUBMIT,
} from "./../actions/types";

const initialState = {
  loading: true,
  errors: null,
  profiles: null,
  profile: null,
  displayProfile: null,
  displayProfileCrowdFundItems: null,
  crowdFundItems: null,
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        profile: payload,
      };

    case CLEAR_USER_PROFILE:
      return {
        ...state,
        loading: false,
        errors: null,
        profile: null,
        crowdFundItems: null,
      };

    case USER_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case CLEAR_PROFILES:
      return {
        ...state,
        loading: false,
        errors: null,
        profiles: null,
        displayProfile: null,
        crowdFundItems: null,
      };

    case LIST_CROWD_FUND_ITEMS:
      return {
        ...state,
        crowdFundItems: payload,
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

    case LIST_CROWD_FUND_ITEMS_FOR_DISPLAY_PROFILE:
      return {
        ...state,
        displayProfileCrowdFundItems: payload,
      };

    case PROFILE_FORM_SUBMIT:
      return {
        ...state,
        profile: payload,
      };

    default:
      return state;
  }
};

export default profileReducer;
