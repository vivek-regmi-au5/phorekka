import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import { PersistGate } from "redux-persist/integration/react";

import authGaurd from "./components/hoc/authGaurd";
import App from "./components/App.jsx";
import Home from "./components/Main/Home";
import Profile from "./components/People/Profile";
import Signup from "./components/Auth/signup";
import Signin from "./components/Auth/signin";
import Auth from './components/Auth/Auth.jsx';
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
            {/* Passing important props from Route to child component */}
            <Route exact path="/signup" render={(props) => <Auth {...props} page={false}/>} />
            <Route exact path="/signin" render={(props) => <Auth {...props} page={true}/>} />
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
