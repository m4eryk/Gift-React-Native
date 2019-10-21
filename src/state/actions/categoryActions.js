import CategoryApi from "../../services/api/categoryApi";
import {SET_CATEGORIES} from "../types/categoryTypes";

export const setCategories = payload => ({
  type: SET_CATEGORIES,
  payload: payload,
});

export const createCategoryAction = data => async () => {
  try {
    const giftResponse = await new CategoryApi().createCategory(data);
    return giftResponse.data;
  } catch (err) {
    throw err;
  }
};

export const getCategoriesAction = () => async dispatch => {
  try {
    const responseData = await new CategoryApi().getCategories();
    dispatch(setCategories(responseData.data));
  } catch (err) {
    throw err;
  }
};

export const deleteCategoryAction = id => async dispatch => {
  try {
    const responseData = await new CategoryApi().deleteCategory(id);
    return responseData.data;
  } catch (err) {
    throw err;
  }
};

export const updateCategoryAction = (id, data) => async dispatch => {
  try {
    const responseData = await new CategoryApi().updateCategory(id, data);
    return responseData.data;
  } catch (error) {
    throw error;
  }
};
