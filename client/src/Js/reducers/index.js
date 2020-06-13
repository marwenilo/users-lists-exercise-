import { combineReducers } from "redux";

import themeReducer from "./themeReducer";
import authReducer from "./authReducer"
import alertReducer from "./alertReducer"
import usersReducer from "./usersReducer"

export default combineReducers({
  themeReducer,
  authReducer,
  alertReducer,
  usersReducer
});
