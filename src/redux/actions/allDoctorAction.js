import axios from "axios";
import {
  BASE_URL,
  ALL_DOCTOR_FAIL,
  ALL_DOCTOR_REQUEST,
  ALL_DOCTOR_SUCCESS,
} from "../actionTypes";
export const getAllDoctor = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_DOCTOR_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(`${BASE_URL}/doctor/profile/all`, config);
    dispatch({
      type: ALL_DOCTOR_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: ALL_DOCTOR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
