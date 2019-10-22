import { combineReducers } from 'redux';

import userReducer from './reducers/userReducer';
import categoryReducer from './reducers/categoryReducer';
import giftReducer from './reducers/giftReducer';
import likeReducer from './reducers/likeReducer';
import appReducer from './reducers/appReducer';

export default combineReducers({
  userReducer,
  categoryReducer,
  giftReducer,
  likeReducer,
  appReducer,
});