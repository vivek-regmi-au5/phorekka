import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import axios from "axios";
import { ThemeProvider } from "@material-ui/core/styles";

import authGaurd from "./components/hoc/authGaurd";
import App from "./components/App";
import Home from "./components/Home";
import Signup from "./components/signup";
import Signin from "./components/signin";
import LandingPage from "./components/landingPage";
import reducers from "./reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import People from "./components/People";
import theme from "./theme";

const jwtToken = localStorage.getItem("JWT_TOKEN");
axios.defaults.headers.common["Authorization"] = jwtToken;
const store = createStore(
  reducers,
  {
    auth: {
      token: jwtToken,
      isAuthenticated: jwtToken ? true : false,
    },
  },
  composeWithDevTools(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <App>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/people" component={People} />
        </App>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
