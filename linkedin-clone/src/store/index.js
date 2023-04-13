import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import thunkMiddleware from "redux-thunk"; // import the thunkMiddleware instance, not the type

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware)); // pass the thunkMiddleware instance as an argument

export default store;
