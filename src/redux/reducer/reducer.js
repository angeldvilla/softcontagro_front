import { combineReducers } from "redux";
import Authentication from "./Authentication";

const rootReducer = combineReducers({
  autenticacion: Authentication,
});

export default rootReducer;
