import { SET_ALERT, REMOVE_ALERT } from "./../actions/types";
const initialState = {
  msg: null,
  alertType: null,
};

const alertReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        msg: payload.msg,
        alertType: payload.alertType,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        msg: null,
        id: null,
        alertType: null,
      };
    default:
      return state;
  }
};

export default alertReducer;
