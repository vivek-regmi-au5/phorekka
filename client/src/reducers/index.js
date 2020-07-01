import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import axios from "axios";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth";
import dashboardReducer from "./dashboard";
import profileReducer from "./profile";
import productReducer from "./product";
import currentProfileReducer from "./currentUserProfile";

const jwtToken = localStorage.getItem("JWT_TOKEN");
axios.defaults.headers.common["Authorization"] = jwtToken;

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  dash: dashboardReducer,
  prof: profileReducer,
  prod: productReducer,
  currProf: currentProfileReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["form", "auth", "dash", "prof", "prod", "currProf"],
};

export default persistReducer(persistConfig, rootReducer);
