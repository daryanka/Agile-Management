export const USERS_LOADING = "USERS_LOADING";
export const USERS_SUCCESS = "USERS_SUCCESS";
export const USERS_FAIL = "USERS_FAIL";

export interface GettingUsers {
  type: typeof USERS_LOADING
}

export interface SuccessUsers {
  type: typeof USERS_SUCCESS,
  payload: UsersStateType
}

export interface FailedUsers {
  type: typeof USERS_FAIL;
}

export type OrganisationUserDispatchTypes = GettingUsers | SuccessUsers | FailedUsers

export interface UserType {
  name: string,
  email: string,
  id: number
}

export type UsersStateType = UserType[];