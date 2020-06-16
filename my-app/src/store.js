import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import item from "./reducers/itemReducer";
import error from "./reducers/errorReducer";
import auth from "./reducers/authReducer";

const store = createStore(
  combineReducers({ item, error, auth }),
  {},
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
