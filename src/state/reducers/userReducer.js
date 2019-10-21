import { USER_ROLE } from "../../constants/user-role.contants";
import { SET_USER } from "../types/userTypes";

const initialState = {
  user: {
    role: USER_ROLE.GUEST
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state
  }
};
