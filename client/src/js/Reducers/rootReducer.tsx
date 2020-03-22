import { combineReducers } from "redux";
import auth from "./authReducer"

const rootReducer = combineReducers({
  auth: auth,
});

export default rootReducer;
