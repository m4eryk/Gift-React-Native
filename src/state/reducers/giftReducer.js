import {SET_GIFT, SET_GIFTS, SET_SEARCH_GIFT_PARAMS, SET_SEARCH_PARAMS} from "../types/giftTypes";

const initialState = {
  gift: null,
  gifts: [],
  searchParams: null,
  giftSearchParams: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_GIFT:
      return {
        ...state,
        gift: action.payload,
      };

    case SET_GIFTS:
      return {
        ...state,
        gifts: action.payload,
      };

    case SET_SEARCH_PARAMS:
      return {
        ...state,
        searchParams: action.payload
      };

    case SET_SEARCH_GIFT_PARAMS:
      return {
        ...state,
        giftSearchParams: action.payload,
      };

    default:
      return state
  }
};
