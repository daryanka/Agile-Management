import {OrganisationUserDispatchTypes, UsersStateType} from "../types/organisationUserDispatchTypes";

interface StateType {loading: boolean, users: UsersStateType}

const initialState: StateType = {
  loading: false,
  users: []
};

const usersReducer = (state:StateType  = initialState, action: OrganisationUserDispatchTypes): StateType => {
  switch (action.type) {
    case "USERS_SUCCESS":
      return {
        loading: false,
        users: [...action.payload]
      }
    case "USERS_FAIL":
      return {
        ...state,
        loading: false
      }
    case "USERS_LOADING":
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}

export default usersReducer