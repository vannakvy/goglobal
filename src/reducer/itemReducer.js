import {
  ITEM_ADD_FAIL,
  ITEM_ADD_SUCCESS,
  ITEM_ADD_REQUEST,
  ITEM_GET_REQUEST,
  ITEM_GET_FAIL,
  ITEM_GET_SUCCESS,
  ITEM_UPDATE_REQUEST,
  ITEM_UPDATE_FAIL,
  ITEM_UPDATE_SUCCESS,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_FAIL,
  ITEM_DELETE_SUCCESS,
} from "../constant/item";

export const itemAddReducer = (state = { itemCreate: {} }, action) => {
  switch (action.type) {
    case ITEM_ADD_REQUEST:
      return { loading: true };
    case ITEM_ADD_SUCCESS:
      return { loading: false };
    case ITEM_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const itemGetReducer = (state = { itemList: [] }, action) => {
  switch (action.type) {
    case ITEM_GET_REQUEST:
      return { loading: true };
    case ITEM_GET_SUCCESS:
      return { loading: false, itemList: action.payload };
    case ITEM_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const itemUpdateReducer = (state = { itemUpdate: {} }, action) => {
  switch (action.type) {
    case ITEM_UPDATE_REQUEST:
      return { loading: true };
    case ITEM_UPDATE_SUCCESS:
      return { loading: false };
    case ITEM_UPDATE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const itemDeleteReducer = (state = { itemDelete: {} }, action) => {
  switch (action.type) {
    case ITEM_DELETE_REQUEST:
      return { loading: true };
    case ITEM_DELETE_SUCCESS:
      return { loading: false };
    case ITEM_DELETE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
