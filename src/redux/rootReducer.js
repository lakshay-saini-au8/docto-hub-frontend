import { combineReducers } from "redux";
import { loginUserReducer, registerUserReducer } from "./reducers/authReducers";
import cartReducer from "./reducers/cartReducers";
import { allDoctorReducer } from "./reducers/doctorReducers";

const rootReducer = combineReducers({
  loginUser: loginUserReducer,
  registerUser: registerUserReducer,
  allDoctor: allDoctorReducer,
  cart: cartReducer,
});

export default rootReducer;
