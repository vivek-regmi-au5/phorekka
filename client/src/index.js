import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import { PersistGate } from "redux-persist/integration/react";

import authGaurd from "./components/hoc/authGaurd";
import App from "./components/App";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Signup from "./components/signup";
import Signin from "./components/signin";
import LandingPage from "./components/landingPage";
import { store, persistor } from "./store";
import People from "./components/People";
import theme from "./theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/people" component={People} />
            <Route exact path="/profile" component={Profile} />
          </App>
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
