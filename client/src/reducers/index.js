import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import axios from "axios";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth";

import profileReducer from "./profile";
import productReducer from "./product";
import currentProfileReducer from "./currentUserProfile";
import alertReducer from "./alert";

const jwtToken = localStorage.getItem("JWT_TOKEN");
axios.defaults.headers.common["Authorization"] = jwtToken;

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  prof: profileReducer,
  prod: productReducer,
  currProf: currentProfileReducer,
  alert: alertReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["form", "auth", "dash", "prof", "prod", "currProf", "alert"],
};

export default persistReducer(persistConfig, rootReducer);
