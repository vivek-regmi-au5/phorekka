import { SET_ALERT, REMOVE_ALERT } from "./../actions/types";
import uuid from "uuid";

export const setAlert = (msg, alertType) => {
  return async (dispatch) => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
  };
};
