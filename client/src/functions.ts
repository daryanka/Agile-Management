import axios, {AxiosResponse} from "axios";
import cookie from "js-cookie";
import store from "./js/Store";
import history from "./js/History";
import _ from "lodash";

type Methods = "GET" | "PUT" | "PATCH" | "POST" | "DELETE";

const functions = {
  send: async (method: Methods, url: string, data?: object, additionalConfig?: object) => {
    const headers: {
      token?: string
    } = {};

    if (cookie.get("token")) {
      headers.token = `${cookie.get("token")}`
    }

    if (process.env.RELEASE_STAGE == "prod") {
      url = `https://api-agile-management.daryanamin.co.uk/api/v1${url}`;
    } else {
      url = `http://localhost:3000/api/v1${url}`;
    }

    const config = _.merge(additionalConfig ? additionalConfig : {}, {
      method: method,
      url: url,
      headers: headers,
      data: data
    });

    try {
      return await axios(config);
    } catch (err) {
      if (err.response.status === 401) {
        cookie.remove("token");
        functions.pushTo("/login")
      }
      return err;
    }
  },

  get: (url: string, config?: object) => {
    return functions.send("GET", url, undefined, config)
  },

  post: (url: string, data: object) => {
    return functions.send("POST", url, data)
  },

  patch: (url: string, data: object) => {
    return functions.send("PATCH", url, data)
  },

  delete: (url: string, data?: object) => {
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

  minutesToTime: (minutes: number): string => {
    const time = {
      m: 0,
      hours: 0,
      days: 0,
      weeks: 0,
    }

    time.weeks = Math.floor(minutes / 10080)
    minutes = minutes % 10080;
    time.days = Math.floor(minutes / 1440);
    minutes = minutes % 1440;
    time.hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    time.m = minutes;

    let str: string[] = [];

    time.weeks > 0 && str.push(`${time.weeks} Week${time.weeks > 1 ? "s" : ""}`);
    time.days > 0 && str.push(`${time.days} Day${time.days > 1 ? "s" : ""}`);
    time.hours > 0 && str.push(`${time.hours} Hour${time.hours > 1 ? "s" : ""}`);
    time.m > 0 && str.push(`${time.m} Minute${time.hours > 1 ? "s" : ""}`);

    return str.join(" ")
  },

  minutesToWDHM: (minutes: number): string => {
    const time = {
      m: 0,
      hours: 0,
      days: 0,
      weeks: 0
    }

    time.weeks = Math.floor(minutes / 10080)
    minutes = minutes % 10080;
    time.days = Math.floor(minutes / 1440);
    minutes = minutes % 1440;
    time.hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    time.m = minutes;

    let str: string[] = [];

    time.weeks > 0 && str.push(`${time.weeks}w `);
    time.days > 0 && str.push(`${time.days}d`);
    time.hours > 0 && str.push(`${time.hours}h`);
    time.m > 0 && str.push(`${time.m}m`);

    return str.join(" ")
  },

  WDHMToMinutes: (str: string): {valid: boolean, minutes: number} => {
    const timesArr = str.split(" ");

    const time = {
      m: 0,
      h: 0,
      d: 0,
      w: 0
    }

    type timeTypes = "m" | "h" | "d" | "w";

    let valid: boolean = true;
    for (let i = 0; i < timesArr.length; i++) {
      const regex = /^([0-9]+)([wdmh])$/;
      if (!regex.test(timesArr[i])) {
        //Invalid
        valid = false;
        break;
      } else {
        //Valid
        const match = regex.exec(timesArr[i])
        const number: number = parseInt(match![1])
        const timeType: timeTypes = match![2] as timeTypes;

        time[timeType] = time[timeType] + number;
      }
    }

    let total = 0;

    for (let key in time) {
      switch (key as timeTypes) {
        case "m":
          total = total + time.m
          break;
        case "h":
          total = total + (60 * time.h)
          break;
        case "d":
          total = total + (60 * 24 * time.d)
          break;
        case "w":
          total = total + (60 * 24 * 7 * time.w)
          break;
      }
    }

    return {
      valid,
      minutes: total
    }
  }
}

export default functions;