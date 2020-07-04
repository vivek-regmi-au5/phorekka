import { SET_ALERT, REMOVE_ALERT } from "./../actions/types";

export const setAlert = (msg, alertType) => {
  return async (dispatch) => {
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
  };
};
