import {SET_SPINNER} from "../types/appTypes";

const initialState = {
  isSpinnerVisible: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SPINNER:
      return {
        ...state,
        isSpinnerVisible: !state.isSpinnerVisible,
      };

    default:
      return state
  }
};
