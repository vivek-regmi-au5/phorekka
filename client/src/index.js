import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import axios from "axios";

import authGaurd from "./components/hoc/authGaurd";
import App from "./components/App";
import Home from "./components/Home";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Dashboard from "./components/dashboard";
import reducers from "./reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";

const jwtToken = localStorage.getItem("JWT_TOKEN");
axios.defaults.headers.common["Authorization"] = jwtToken;

ReactDOM.render(
  <Provider
    store={createStore(
      reducers,
      {
        auth: {
          token: jwtToken,
          isAuthenticated: jwtToken ? true : false,
        },
      },
      composeWithDevTools(applyMiddleware(reduxThunk))
    )}
  >
    <BrowserRouter>
      <App>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/dashboard" component={authGaurd(Dashboard)} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
