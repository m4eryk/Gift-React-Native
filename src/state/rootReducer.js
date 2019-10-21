import { combineReducers } from 'redux';

import userReducer from './reducers/userReducer';
import categoryReducer from './reducers/categoryReducer';
import giftReducer from './reducers/giftReducer';

export default combineReducers({
  userReducer,
  categoryReducer,
  giftReducer
});