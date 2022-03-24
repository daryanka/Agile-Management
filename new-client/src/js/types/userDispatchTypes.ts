export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOGOUT_USER = "LOGIN_LOGOUT_USER";
export const USER_ME = "USER_ME";

interface GettingUser {
  type: typeof LOGIN_LOADING;
}

interface FailedGettingUser {
  type: typeof LOGIN_FAIL,
  payload: {
    message?: string
  }
}

interface SuccessGettingUser {
  type: typeof LOGIN_SUCCESS;
  payload: {
    id: number,
    organisation_id: number,
    role: string
  }
}

interface LogoutUser {
  type: typeof LOGIN_LOGOUT_USER
}

interface Me {
  type: typeof USER_ME,
  payload: {
    id: number,
    organisation_id: number,
    role: string
  }
}

export interface authReducerState {
  isAuthenticated: boolean,
  loading: boolean,
  message?: string,
  role: string | undefined | null,
  id?: number,
  organisation_id?: number
}

export type UserDispatchTypes = GettingUser | FailedGettingUser | SuccessGettingUser | LogoutUser | Me
