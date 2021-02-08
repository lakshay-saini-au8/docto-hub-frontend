import { combineReducers } from "redux";
import { loginUserReducer, registerUserReducer } from "./reducers/authReducers";
import { allDoctorReducer } from "./reducers/doctorReducers";

const rootReducer = combineReducers({
  loginUser: loginUserReducer,
  registerUser: registerUserReducer,
  allDoctor: allDoctorReducer,
});

export default rootReducer;
