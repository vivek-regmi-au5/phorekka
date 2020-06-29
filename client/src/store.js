import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { persistStore } from "redux-persist";
import rootReducer from "./reducers/index";
const jwtToken = localStorage.getItem("JWT_TOKEN");

export const store = createStore(
  rootReducer,
  {
    auth: {
      token: jwtToken,
      isAuthenticated: jwtToken ? true : false,
    },
  },
  composeWithDevTools(applyMiddleware(reduxThunk))
);
export const persistor = persistStore(store);
