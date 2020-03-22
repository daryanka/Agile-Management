import axios, {AxiosResponse} from "axios";
import cookie from "js-cookie";
import store from "./js/Store";

type Methods = "GET" | "PUT" | "PATCH" | "POST" | "DELETE";

const functions = {
  send: async (method: Methods, url: string, data?: object) => {
    const headers: {
      Authorization?: string
    } = {};

    if (cookie.get("token")) {
      headers.Authorization = `Bearer ${cookie.get("token")}`
    }

    url = `http://localhost:3000/api/v1${url}`;

    try {
      const res = await axios({
        method: method,
        url: url,
        headers: headers,
        data: data
      })

      return res.data;
    } catch (err) {
      if (err.response.status === 401) {
        cookie.remove("token");
      }
      return err;
    }
  },

  get: (url: string) => {
    return functions.send("GET", url)
  },

  post: (url: string, data: object) => {
    return functions.send("GET", url)
  },

  delete: (url: string, data: object) => {
    return functions.send("GET", url)
  },

  getRole: () => {
    const state = store.getState();
    return state?.auth?.role;
  },

  isAdmin: () : boolean => {
    const state = store.getState();
    return state?.auth?.role === "admin"
  },

  apiError: (response: AxiosResponse): boolean => {
    return response.status !== 200
  }
}

export default functions;