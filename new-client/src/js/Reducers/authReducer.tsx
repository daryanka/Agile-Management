import Cookie from "js-cookie";
import {
  authReducerState,
  LOGIN_FAIL,
  LOGIN_LOADING,
  LOGIN_LOGOUT_USER,
  LOGIN_SUCCESS,
  USER_ME,
  UserDispatchTypes
} from "../types/userDispatchTypes";

const defaultState: authReducerState = {
  isAuthenticated: false,
  loading: false,
  message: "",
  role: null
};

const authReducer = (state = defaultState, action: UserDispatchTypes): authReducerState  => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true
      };
    case LOGIN_FAIL:
      Cookie.remove("token");
      return {
        ...state,
        loading: false,
        message: action.payload.message && action.payload.message
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        message: "",
        isAuthenticated: true,
        loading: false,
        ...action.payload
      };

    case LOGIN_LOGOUT_USER:
      Cookie.remove("token");
      return {
        ...state,
        message: "",
        isAuthenticated: false,
        loading: false
      };

    case USER_ME:
      return {
        ...state,
        isAuthenticated: true,
        ...action.payload
      }

    default:
      return state
  }
}

export default authReducer
