import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

import { SET_USER } from "../types/userTypes";
import UserApi from "../../services/api/userApi";
import { SECURESTORE } from "../../constants/store";

export const setUserProfile = payload => ({
  type: SET_USER,
  payload: payload,
});

export const loginUserAction = data => async dispatch => {
  try {
    const loginResponse = await new UserApi().login(data);
    const { token } = loginResponse.data;
    await SecureStore.setItemAsync(SECURESTORE.TOKEN, token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const userResponse = await new UserApi().getUser();
    dispatch(setUserProfile(userResponse.data));
  } catch (err) {
    throw err;
  }
};

export const getUserAction = () => async dispatch => {
  try {
    const token = await SecureStore.getItemAsync(SECURESTORE.TOKEN);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const userResponse = await new UserApi().getUser();
    dispatch(setUserProfile(userResponse.data));
  } catch (error) {
    await SecureStore.deleteItemAsync(SECURESTORE.TOKEN);
    throw error;
  }
};

export const registrationUserAction = user => async () => {
    try {
      const responseData = await new UserApi().registration(user);
      return responseData.data;
    } catch (err) {
      throw err;
  }
};