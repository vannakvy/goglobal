import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userAccountListReducer,
  userAccountDeleteReducer,
} from "./reducer/authReducer";
import {
  doneeAndDonorAddReducer,
  doneeAndDonorGetReducer,
  doneeDonorUpdateReducer,
  doneeDonorDeleteReducer,
  doneeAndDonorDetailReducer,
} from "./reducer/doneeAndDonorReducer";

import {
  itemAddReducer,
  itemGetReducer,
  itemUpdateReducer,
  itemDeleteReducer,
} from "./reducer/itemReducer";

import {
  donationGetReducer,
  donationAddReducer,
} from "./reducer/donationReducer";

const reducer = combineReducers({
  userInfo: userLoginReducer,
  userRegisterCreate: userRegisterReducer,
  userAccountList: userAccountListReducer,
  userAccountDelete: userAccountDeleteReducer,

  doneeAndDonorCreate: doneeAndDonorAddReducer,
  doneeAndDonorList: doneeAndDonorGetReducer,
  doneeAndDonorUpdate: doneeDonorUpdateReducer,
  doneeAndDonorDelete: doneeDonorDeleteReducer,
  doneeAndDonorDetail: doneeAndDonorDetailReducer,

  itemCreate: itemAddReducer,
  itemList: itemGetReducer,
  itemUpdate: itemUpdateReducer,
  itemDelete: itemDeleteReducer,

  donationCreate: donationAddReducer,
  donationList: donationGetReducer,
  // donationUpdate: doneeDonorUpdateReducer,
  // donationDelete: doneeDonorDeleteReducer,
  // donationDetail: doneeAndDonorDetailReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  userInfo: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
