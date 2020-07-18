import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import { PersistGate } from "redux-persist/integration/react";

import authGaurd from "./components/hoc/authGaurd";
import App from "./components/App";
import Home from "./components/Main/Home";
import Profile from "./components/People/Profile";
import Signup from "./components/Auth/signup";
import Signin from "./components/Auth/signin";
import LandingPage from "./components/Main/landingPage";
import { store, persistor } from "./store";
import People from "./components/People/People";
import theme from "./theme";
import ProductList from "./components/Product/ProductList";
import Product from "./components/Product/Product";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/people" component={People} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/product" component={ProductList} />
            <Route exact path="/product/item" component={Product} />
          </App>
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
