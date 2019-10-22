import GiftApi from "../../services/api/giftApi";
import {SET_GIFT, SET_GIFTS, SET_RANDOM_GIFT, SET_SEARCH_GIFT_PARAMS, SET_SEARCH_PARAMS} from "../types/giftTypes";
import {getSearchGiftParamsSelector, getSearchParamsSelector} from "../selectors/giftSelector";

export const setGift = payload => ({
  type: SET_GIFT,
  payload: payload,
});

export const setGifts = payload => ({
  type: SET_GIFTS,
  payload: payload,
});

export const setSearchParams = payload => ({
  type: SET_SEARCH_PARAMS,
  payload: payload,
});

export const setSearchGiftParams = payload => ({
  type: SET_SEARCH_GIFT_PARAMS,
  payload: payload,
});

export const setRandomGift = payload => ({
  type: SET_RANDOM_GIFT,
  payload: payload,
});

export const createGiftAction = data => async () => {
  try {
    const giftResponse = await new GiftApi().createGift(data);
    return giftResponse.data;
  } catch (err) {
    throw err;
  }
};

export const setSearchGiftParamsAction = params => async dispatch => {
  dispatch(setSearchGiftParams(params));
};

export const getGiftAction = () => async (dispatch, getState) => {
  try {
    const searchParams = getSearchGiftParamsSelector(getState());
    const responseData = await new GiftApi().getGift(searchParams.id);
    dispatch(setGift(responseData.data));
    dispatch(setSearchGiftParams(null));
  } catch (err) {
    throw err;
  }
};

export const getRandomGiftAction = () => async (dispatch, getState) => {
  try {
    const responseData = await new GiftApi().getRandomGift();
    dispatch(setRandomGift(responseData.data));
  } catch (err) {
    throw err;
  }
};

export const getGiftsAction = () => async (dispatch, getState) => {
  try {
    const searchParams = getSearchParamsSelector(getState());
    const responseData = await new GiftApi().getGifts(searchParams);
    dispatch(setGifts(responseData.data));
    dispatch(setSearchParams(null));
  } catch (err) {
    throw err;
  }
};

export const setSearchParamsAction = params => async dispatch => {
  dispatch(setSearchParams(params));
};

export const deleteGiftAction = id => async dispatch => {
  try {
    const responseData = await new GiftApi().deleteGift(id);
    return responseData.data;
  } catch (err) {
    throw err;
  }
};

export const updateGiftAction = (id, data) => async dispatch => {
  try {
    const responseData = await new GiftApi().updateGift(id, data);
    return responseData.data;
  } catch (error) {
    throw error;
  }
};


