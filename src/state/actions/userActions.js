import {SET_USER} from "../types/userTypes";
import UserApi from "../../services/api/userApi";

export const setUserProfile = (user) => ({
  type: SET_USER,
  payload: user,
});

export const loginUserAction = (data, routeHistory) => async dispatch => {
  try {
    //const responseData = await new UserApi().login(data);
    //LocalStorageUtil.set(LOCAL_STORAGE.TOKEN_NAME, responseData.data.token);
    ////dispatch(setUserProfile(responseData.data));
    dispatch(setUserProfile({role: 'admin'}))
    //routeHistory.push(ROUTE_PATH.MAIN_PAGE);
  } catch (err) {
    throw err;
  }
};

export const registrationUserAction = (user, routerHistory) =>
  async () => {
    try {
      await new UserApi().registration(user);
      //routerHistory.push(ROUTE_PATH.LOGIN);
    } catch (err) {
      throw err;
    }
  };