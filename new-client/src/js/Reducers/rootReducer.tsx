import { combineReducers } from "redux";
import auth from "./authReducer"
import usersReducer from "./usersReducer";

const rootReducer = combineReducers({
  auth: auth,
  users: usersReducer
});

export default rootReducer;
