import {SET_SPINNER} from "../types/appTypes";

export const setSpinner = () => ({
  type: SET_SPINNER
});

export const setSpinnerAction = () => async dispatch => {
  try {
    dispatch(setSpinner());
  } catch (err) {
    throw err;
  }
};
