import {
  DONOR_DONEE_ADD_FAIL,
  DONOR_DONEE_ADD_SUCCESS,
  DONOR_DONEE_ADD_REQUEST,
  DONOR_DONEE_GET_REQUEST,
  DONOR_DONEE_GET_FAIL,
  DONOR_DONEE_GET_SUCCESS,
  DONOR_DONEE_UPDATE_REQUEST,
  DONOR_DONEE_UPDATE_FAIL,
  DONOR_DONEE_UPDATE_SUCCESS,
  DONOR_DONEE_DELETE_REQUEST,
  DONOR_DONEE_DELETE_FAIL,
  DONOR_DONEE_DELETE_SUCCESS,
  DONOR_DONEE_DETAIL_REQUEST,
  DONOR_DONEE_DETAIL_FAIL,
  DONOR_DONEE_DETAIL_SUCCESS,
} from "../constant/doneeAndDonor";

export const doneeAndDonorAddReducer = (
  state = { doneeAndDonorCreate: {} },
  action
) => {
  switch (action.type) {
    case DONOR_DONEE_ADD_REQUEST:
      return { loading: true };
    case DONOR_DONEE_ADD_SUCCESS:
      return { loading: false };
    case DONOR_DONEE_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const doneeAndDonorGetReducer = (
  state = { doneeAndDonorList: [] },
  action
) => {
  switch (action.type) {
    case DONOR_DONEE_GET_REQUEST:
      return { loading: true };
    case DONOR_DONEE_GET_SUCCESS:
      return { loading: false, doneeAndDonorList: action.payload };
    case DONOR_DONEE_GET_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const doneeAndDonorDetailReducer = (
  state = { doneeAndDonorDetailList: [] },
  action
) => {
  switch (action.type) {
    case DONOR_DONEE_DETAIL_REQUEST:
      return { loading: true };
    case DONOR_DONEE_DETAIL_SUCCESS:
      return { loading: false, doneeAndDonorDetailList: action.payload };
    case DONOR_DONEE_DETAIL_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const doneeDonorUpdateReducer = (
  state = { doneeDonorUpdate: {} },
  action
) => {
  switch (action.type) {
    case DONOR_DONEE_UPDATE_REQUEST:
      return { loading: true };
    case DONOR_DONEE_UPDATE_SUCCESS:
      return { loading: false };
    case DONOR_DONEE_UPDATE_FAIL:
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
    case DONOR_DONEE_DELETE_REQUEST:
      return { loading: true };
    case DONOR_DONEE_DELETE_SUCCESS:
      return { loading: false };
    case DONOR_DONEE_DELETE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
