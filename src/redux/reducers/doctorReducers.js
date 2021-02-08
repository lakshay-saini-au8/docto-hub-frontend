import {
  ALL_DOCTOR_FAIL,
  ALL_DOCTOR_REQUEST,
  ALL_DOCTOR_RESET,
  ALL_DOCTOR_SUCCESS,
} from "../actionTypes";
export const allDoctorReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ALL_DOCTOR_REQUEST:
      return { loading: true };
    case ALL_DOCTOR_SUCCESS:
      return { loading: false, doctors: payload };
    case ALL_DOCTOR_FAIL:
      return { loading: false, error: payload };
    case ALL_DOCTOR_RESET:
      return {};

    default:
      return state;
  }
};
