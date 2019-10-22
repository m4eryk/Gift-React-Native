import { SET_LIKES } from "../types/likeTypes";

const initialState = {
  likes: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LIKES:
      return {
        ...state,
        likes: action.payload,
      };

    default:
      return state
  }
};
