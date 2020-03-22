import React from "react";
import ReactDOM from "react-dom";
import App from "./js/app";
import history from "./js/History";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./js/Store";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} >
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);