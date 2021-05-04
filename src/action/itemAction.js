import db from "../config/db";
import {
  ITEM_ADD_REQUEST,
  ITEM_ADD_SUCCESS,
  ITEM_ADD_FAIL,
  ITEM_GET_REQUEST,
  ITEM_GET_FAIL,
  ITEM_GET_SUCCESS,
  ITEM_UPDATE_REQUEST,
  ITEM_UPDATE_SUCCESS,
  ITEM_UPDATE_FAIL,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
  ITEM_DELETE_FAIL,
} from "../constant/item";

export const getItem = () => async (dispatch) => {
  try {
    dispatch({ type: ITEM_GET_REQUEST });
    const data = await db.collection("item").get();
    dispatch({
      type: ITEM_GET_SUCCESS,
      payload: data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
    });
  } catch (error) {
    dispatch({ type: ITEM_GET_FAIL, payload: error.message });
  }
};

export const addItem = (item, description, unit) => async (dispatch) => {
  try {
    dispatch({ type: ITEM_ADD_REQUEST });
    db.collection("item")
      .add({
        item: item,
        unit: unit,
        description: description,
        countInStock: 0,
      })
      .then((res) => {
        dispatch({ type: ITEM_ADD_SUCCESS });
      });
  } catch (error) {
    dispatch({ type: ITEM_ADD_FAIL, payload: error.message });
  }
};

export const updateItem = (item, description, unit, updateId) => async (
  dispatch
) => {
  try {
    dispatch({ type: ITEM_UPDATE_REQUEST });
    db.collection("item")
      .doc(updateId)
      .update({
        item: item,
        description: description,
        unit: unit,
      })
      .then((res) => {
        dispatch({ type: ITEM_UPDATE_SUCCESS });
      });
  } catch (error) {
    dispatch({ type: ITEM_UPDATE_FAIL, payload: error.message });
  }
};

export const deleteItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: ITEM_DELETE_REQUEST });
    db.collection("item")
      .doc(id)
      .delete()
      .then((res) => {
        dispatch({ type: ITEM_DELETE_SUCCESS });
      });
  } catch (error) {
    dispatch({ type: ITEM_DELETE_FAIL, payload: error.message });
  }
};
