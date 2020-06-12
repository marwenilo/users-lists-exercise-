import { combineReducers } from "redux";

import rootReducer from "./rootReducer";
import authReducer from "./authReducer"
import alertReducer from "./alertReducer"
import usersReducer from "./usersReducer"

export default combineReducers({
  rootReducer,
  authReducer,
  alertReducer,
  usersReducer
});
