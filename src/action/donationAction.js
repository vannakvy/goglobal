import db from "../config/db";
import firebase from "firebase";
import {
  DONATION_ADD_REQUEST,
  DONATION_ADD_SUCCESS,
  DONATION_ADD_FAIL,
  DONATION_GET_REQUEST,
  DONATION_GET_FAIL,
  DONATION_GET_SUCCESS,
  DONATION_UPDATE_REQUEST,
  DONATION_UPDATE_SUCCESS,
  DONATION_UPDATE_FAIL,
  DONATION_DELETE_REQUEST,
  DONATION_DELETE_SUCCESS,
  DONATION_DELETE_FAIL,
  DONATION_DETAIL_REQUEST,
  DONATION_DETAIL_SUCCESS,
  DONATION_DETAIL_FAIL,
} from "../constant/donationConstant";
import { DONOR_DONEE_ADD_SUCCESS } from "../constant/doneeAndDonor";

export const getDonation = (condition) => async (dispatch) => {
  try {
    dispatch({ type: DONATION_GET_REQUEST });
    let data, newData;
    if (condition === "donation") {
      data = await db.collection("donation").where("con", "==", true).get();
    } else {
      data = await db.collection("donation").where("con", "==", false).get();
    }

    newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    dispatch({
      type: DONATION_GET_SUCCESS,
      payload: newData,
    });
  } catch (error) {
    dispatch({ type: DONATION_GET_FAIL, payload: error.message });
  }
};

//GET USER DETAIL

// export const getDonationDetail = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: DONATION_DETAIL_REQUEST });
//     const data = await db
//       .collection("donations")
//       .where("userId", "==", id)
//       .get();
//     dispatch({
//       type: DONATION_DETAIL_SUCCESS,
//       payload: data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
//     });
//   } catch (error) {
//     dispatch({ type: DONOR_DONEE_DETAIL_FAIL, payload: error.message });
//   }
// };

export const addDonation = (data, con) => async (dispatch) => {
  console.log(data);
  try {
    dispatch({ type: DONATION_ADD_REQUEST });
    var batch = db.batch();
    db.collection("donation")
      .add({
        date: new Date(`${data.date}`).toISOString(),
        cash: data.cash,
        userId: data.userId,
        numberOfItem: data.taskList.length,
        con: con,
      })
      .then((res) => {
        db.collection("conclusion")
          .doc("QMfeme9U318gGqYGUNed")
          .update({
            totalCash: firebase.firestore.FieldValue.increment(
              con === true ? data.cash : -data.cash
            ),
          });
        data.taskList &&
          data.taskList.forEach((d) => {
            db.collection("item")
              .doc(d.item)
              .update({
                countInStock: firebase.firestore.FieldValue.increment(d.qty),
              });
            var docRef = db.collection("donate_item").doc(); //automatically generate unique id
            batch.set(docRef, { ...d, donationInId: res.id });
          });
        batch.commit();
        dispatch({ type: DONOR_DONEE_ADD_SUCCESS });
      });
  } catch (error) {
    dispatch({ type: DONATION_ADD_FAIL, payload: error.message });
  }
};

// export const updateDonation = (
//   userName,
//   donor,
//   address,
//   tel,
//   company,
//   updateId
// ) => async (dispatch) => {
//   try {
//     dispatch({ type: DONOR_DONEE_UPDATE_REQUEST });
//     db.collection("doneedonor")
//       .doc(updateId)
//       .update({
//         userName: userName,
//         donor: donor,
//         address: address,
//         tel: tel,
//         company: company,
//       })
//       .then((res) => {
//         dispatch({ type: DONOR_DONEE_UPDATE_SUCCESS });
//       });
//   } catch (error) {
//     dispatch({ type: DONOR_DONEE_UPDATE_FAIL, payload: error.message });
//   }
// };

// export const deleteDonation = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: DONOR_DONEE_DELETE_REQUEST });
//     db.collection("doneedonor")
//       .doc(id)
//       .delete()
//       .then((res) => {
//         dispatch({ type: DONOR_DONEE_DELETE_SUCCESS });
//       });
//   } catch (error) {
//     dispatch({ type: DONOR_DONEE_DELETE_FAIL, payload: error.message });
//   }
// };
