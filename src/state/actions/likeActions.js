import LikeApi from "../../services/api/likeApi";
import { SET_LIKES } from "../types/likeTypes";

export const setLikes = payload => ({
  type: SET_LIKES,
  payload: payload,
});

export const setLikeAction = data => async () => {
  try {
    const giftResponse = await new LikeApi().setLike(data);
    return giftResponse.data;
  } catch (err) {
    throw err;
  }
};

export const getLikeAction = () => async dispatch => {
  try {
    const likeResponse = await new LikeApi().getLikes();
    dispatch(setLikes(likeResponse.data));
  } catch (err) {
    throw err;
  }
};

export const deleteLikeAction = id => async dispatch => {
  try {
    const likeResponse = await new LikeApi().deleteLike(id);
    return likeResponse.data;
  } catch (err) {
    throw err;
  }
};
