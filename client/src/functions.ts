import axios, {AxiosResponse} from "axios";
import cookie from "js-cookie";
import store from "./js/Store";
import history from "./js/History";

type Methods = "GET" | "PUT" | "PATCH" | "POST" | "DELETE";

const functions = {
  send: async (method: Methods, url: string, data?: object) => {
    const headers: {
      token?: string
    } = {};

    if (cookie.get("token")) {
      headers.token = `${cookie.get("token")}`
    }

    url = `http://localhost:3000/api/v1${url}`;

    try {
      return await axios({
        method: method,
        url: url,
        headers: headers,
        data: data
      });
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
    return functions.send("POST", url, data)
  },

  delete: (url: string, data: object) => {
    return functions.send("DELETE", url, data)
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
  },

  pushTo: (url: string) => {
    history.push(url)
  },

  minutesToTime: (minutes: number) => {
    const time = {
      m: 0,
      hours: 0,
      days: 0
    }

    time.days = Math.floor(minutes / 3600);
    minutes = minutes % 3600;
    time.hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    time.m = minutes;

    let str: string[] = [];

    time.days > 0 && str.push(`${time.days} Days`);
    time.hours > 0 && str.push(`${time.hours} Hours`);
    time.m > 0 && str.push(`${time.m} Minutes`);

    return str.join(" ")
  }
}

export default functions;