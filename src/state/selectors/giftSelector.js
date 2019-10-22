export const getGiftsSelector = state => {
  return state.giftReducer.gifts;
};

export const getRandomGiftSelector = state => {
  return state.giftReducer.randomGift;
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

export const getLikesSelector = state => {
  return state.likeReducer.likes;
};
