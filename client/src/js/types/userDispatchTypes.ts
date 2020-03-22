interface GettingUser {
  type: "LOGIN_LOADING"
}

interface FailedGettingUser {
  type: "LOGIN_FAIL"
}

interface SuccessGettingUser {
  type: "LOGIN_SUCCESS";
  payload: {
    token: string;
  }
}

export type UserDispatchTypes = GettingUser | FailedGettingUser | SuccessGettingUser
