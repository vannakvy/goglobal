import db from "../config/db";
import {
  DONOR_DONEE_ADD_REQUEST,
  DONOR_DONEE_ADD_SUCCESS,
  DONOR_DONEE_ADD_FAIL,
  DONOR_DONEE_GET_REQUEST,
  DONOR_DONEE_GET_FAIL,
  DONOR_DONEE_GET_SUCCESS,
  DONOR_DONEE_UPDATE_REQUEST,
  DONOR_DONEE_UPDATE_SUCCESS,
  DONOR_DONEE_UPDATE_FAIL,
  DONOR_DONEE_DELETE_REQUEST,
  DONOR_DONEE_DELETE_SUCCESS,
  DONOR_DONEE_DELETE_FAIL,
  DONOR_DONEE_DETAIL_REQUEST,
  DONOR_DONEE_DETAIL_SUCCESS,
  DONOR_DONEE_DETAIL_FAIL,
} from "../constant/doneeAndDonor";

export const getDoneeAndDonors = (query) => async (dispatch) => {
  try {
    dispatch({ type: DONOR_DONEE_GET_REQUEST });
    let data, newData;

    if ((query.donee && query.donee) || (!query.donee && !query.donee)) {
      data = await db.collection("doneedonor").get();
    }
    if (!query.donor && query.donee) {
      data = await db
        .collection("doneedonor")
        .where("donor", "==", false)
        .get();
    }
    if (query.donor && !query.donee) {
      data = await db.collection("doneedonor").where("donor", "==", true).get();
    }

    newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    dispatch({
      type: DONOR_DONEE_GET_SUCCESS,
      payload: newData,
    });
  } catch (error) {
    dispatch({ type: DONOR_DONEE_GET_FAIL, payload: error.message });
  }
};

//GET USER DETAIL

export const getDoneeAndDonorDetail = (userName) => async (dispatch) => {
  try {
    dispatch({ type: DONOR_DONEE_DETAIL_REQUEST });
    const data = await db
      .collection("donation")
      .where("userId", "==", userName)
      .get();
    dispatch({
      type: DONOR_DONEE_DETAIL_SUCCESS,
      payload: data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
    });
  } catch (error) {
    dispatch({ type: DONOR_DONEE_DETAIL_FAIL, payload: error.message });
  }
};

export const addDoneeAndDonor = (
  userName,
  donor,
  address,
  tel,
  company
) => async (dispatch) => {
  try {
    dispatch({ type: DONOR_DONEE_ADD_REQUEST });
    db.collection("doneedonor")
      .add({
        userName: userName,
        donor: donor,
        address: address,
        tel: tel,
        company: company,
      })
      .then((res) => {
        dispatch({ type: DONOR_DONEE_ADD_SUCCESS });
      });
  } catch (error) {
    dispatch({ type: DONOR_DONEE_ADD_FAIL, payload: error.message });
  }
};

export const updateDoneeAndDonor = (
  userName,
  donor,
  address,
  tel,
  company,
  updateId
) => async (dispatch) => {
  try {
    dispatch({ type: DONOR_DONEE_UPDATE_REQUEST });
    db.collection("doneedonor")
      .doc(updateId)
      .update({
        userName: userName,
        donor: donor,
        address: address,
        tel: tel,
        company: company,
      })
      .then((res) => {
        dispatch({ type: DONOR_DONEE_UPDATE_SUCCESS });
      });
  } catch (error) {
    dispatch({ type: DONOR_DONEE_UPDATE_FAIL, payload: error.message });
  }
};

export const deleteDoneeAndDonor = (id) => async (dispatch) => {
  try {
    dispatch({ type: DONOR_DONEE_DELETE_REQUEST });
    db.collection("doneedonor")
      .doc(id)
      .delete()
      .then((res) => {
        dispatch({ type: DONOR_DONEE_DELETE_SUCCESS });
      });
  } catch (error) {
    dispatch({ type: DONOR_DONEE_DELETE_FAIL, payload: error.message });
  }
};
