import {Dispatch} from "redux";
import fn from "../../functions";
import {
  OrganisationUserDispatchTypes,
  USERS_FAIL,
  USERS_LOADING,
  USERS_SUCCESS
} from "../types/organisationUserDispatchTypes";

export const getUsers = () => async (dispatch: Dispatch<OrganisationUserDispatchTypes>) => {
  dispatch({
    type: USERS_LOADING
  })

  const res = await fn.get("/users");

  if (!fn.apiError(res)) {
    dispatch({
      type: USERS_SUCCESS,
      payload: res.data
    })
  } else {
    dispatch({
      type: USERS_FAIL
    })
  }
}