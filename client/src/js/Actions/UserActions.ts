import fn from "../../functions";
import {Dispatch} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {UserDispatchTypes} from "../types/userDispatchTypes";

export const getUser = (email: string, password: string) => async (dispatch: Dispatch<UserDispatchTypes>) => {
  dispatch({
    type: "LOGIN_LOADING"
  })

  const res = await fn.post("/auth/login",{
    email: email,
    password: password
  });

  if (!fn.apiError(res)) {
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        token: res.data.token
      }
    })
  } else {
    dispatch({
      type: "LOGIN_FAIL"
    })
  }
};
//