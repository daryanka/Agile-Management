import axios from "axios";
import cookie from "js-cookie";
import store from "./js/Store";

type Methods = "GET" | "PUT" | "PATCH" | "POST" | "DELETE";

const functions = {
  send: (method: Methods, url: string, data?: object) => {
    const headers: {
      Authorization?: string
    } = {};

    if (cookie.get("token")) {
      headers.Authorization = `Bearer ${cookie.get("token")}`
    }

    axios({
      method: method,
      url: url,
      headers: headers,
      data: data
    }).then(res => {
      return res.data;
    }).catch(err => {
      if (err.response.status === 401) {
        cookie.remove("token");
      }
      return err;
    })
  },

  get: (url: string) => {
    return functions.send("GET", url)
  },

  post: (url: string, data: object) => {
    functions.send("GET", url)
  },

  delete: (url: string, data: object) => {
    functions.send("GET", url)
  },

  getRole: () => {
    const state = store.getState();
    return state?.auth?.role;
  }
}

export default functions;