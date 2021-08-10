import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import userReduce from "./reducers/userReduce";

const reducers = combineReducers({
  user: userReduce,
});

const store = createStore(reducers, applyMiddleware(thunk));
window.store = store;
export default store;
