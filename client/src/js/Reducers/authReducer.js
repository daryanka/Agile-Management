import Cookie from "js-cookie";

const defaultState = {
  isAuthenticated: false,
  loading: false
};

const authReducer = (state = defaultState, action) => {
  const { payload } = action;
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
        loading: false
      };
    case LOGIN_SUCCESS:
      if (payload.token) {
        Cookie.set("token", payload.token, { expires: 10 / 24 })
      }

      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        ...payload
      };

    case "LOGOUT":
      Cookie.remove("token");
      return {
        isAuthenticated: false,
        loading: false
      };
    default:
      return state
  }
}

export default authReducer
