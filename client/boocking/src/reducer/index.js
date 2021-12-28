import { createStore, combineReducers } from "redux";
import searches from "./search"
const reducers = combineReducers({searches});
const store = createStore(reducers);
export default store;
