import fn from "../../functions";
import {Dispatch} from "redux";
import {USER_ME, UserDispatchTypes} from "../types/userDispatchTypes";

import {LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS} from "../types/userDispatchTypes";
import Cookie from "js-cookie";


export const getUser = (email: string, password: string) => async (dispatch: Dispatch<UserDispatchTypes>) => {
  dispatch({
    type: LOGIN_LOADING
  })

  const res = await fn.post("/auth/login",{
    email: email,
    password: password
  });

  if (!fn.apiError(res)) {
    Cookie.set("token", res.data.token, { expires: 1 / 24 })

    //Get me data
    const me = await fn.get("/auth/me");

    if (!fn.apiError(me)) {
      const {role, id, organisation_id} = me.data;

      fn.pushTo("/projects/search")

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          role,
          id,
          organisation_id
        }
      })
    }
  } else {
    let message = "";

    if (res.response?.data && (typeof res.response?.data === "string")) {
      message = res.response?.data;
    } else if (res.response?.data?.message) {
      message = res.response?.data?.message;
    } else {
      message = "Server error, please try again later."
    }

    dispatch({
      type: LOGIN_FAIL,
      payload: {
        message
      }
    })
  }
};

export const userMe = () => async (dispatch: Dispatch<UserDispatchTypes>) => {
  const res = await fn.get("/auth/me");

  if (!fn.apiError(res)) {
    const {role, id, organisation_id} = res.data

    dispatch({
      type: USER_ME,
      payload: {
        role,
        id,
        organisation_id
      }
    })
  } else {
    Cookie.remove("token");
  }
}