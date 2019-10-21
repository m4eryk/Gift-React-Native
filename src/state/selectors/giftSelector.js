export const getGiftsSelector = state => {
  return state.giftReducer.gifts;
};

export const getGiftSelector = state => {
  return state.giftReducer.gift;
};

export const getSearchParamsSelector = state => {
  return state.giftReducer.searchParams;
};

export const getSearchGiftParamsSelector = state => {
  return state.giftReducer.giftSearchParams;
};
