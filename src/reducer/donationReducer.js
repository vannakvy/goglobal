import {
  DONATION_ADD_FAIL,
  DONATION_ADD_SUCCESS,
  DONATION_ADD_REQUEST,
  DONATION_GET_REQUEST,
  DONATION_GET_FAIL,
  DONATION_GET_SUCCESS,
  DONATION_UPDATE_REQUEST,
  DONATION_UPDATE_FAIL,
  DONATION_UPDATE_SUCCESS,
  DONATION_DELETE_REQUEST,
  DONATION_DELETE_FAIL,
  DONATION_DELETE_SUCCESS,
} from "../constant/donationConstant";

export const donationAddReducer = (state = { donationCreate: {} }, action) => {
  switch (action.type) {
    case DONATION_ADD_REQUEST:
      return { loading: true };
    case DONATION_ADD_SUCCESS:
      return { loading: false };
    case DONATION_ADD_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const donationGetReducer = (state = { donationList: [] }, action) => {
  switch (action.type) {
    case DONATION_GET_REQUEST:
      return { loading: true };
    case DONATION_GET_SUCCESS:
      return { loading: false, donationList: action.payload };
    case DONATION_GET_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

// export const donationDetailReducer = (
//   state = { donationDetailList: [] },
//   action
// ) => {
//   switch (action.type) {
//     case DONATION_DETAIL_REQUEST:
//       return { loading: true };
//     case DONATION_DETAIL_SUCCESS:
//       return { loading: false, donationDetailList: action.payload };
//     case DONATION_DETAIL_FAIL:
//       return { error: action.payload };
//     default:
//       return state;
//   }
// };

export const doneeDonorUpdateReducer = (
  state = { doneeDonorUpdate: {} },
  action
) => {
  switch (action.type) {
    case DONATION_UPDATE_REQUEST:
      return { loading: true };
    case DONATION_UPDATE_SUCCESS:
      return { loading: false };
    case DONATION_UPDATE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const doneeDonorDeleteReducer = (
  state = { doneeDonorDelete: {} },
  action
) => {
  switch (action.type) {
    case DONATION_DELETE_REQUEST:
      return { loading: true };
    case DONATION_DELETE_SUCCESS:
      return { loading: false };
    case DONATION_DELETE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
