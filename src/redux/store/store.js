import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { saveState, loadState } from "../storage/LocalStorage";
import rootReducer from "../reducer/reducer";
/* ------------------------------------------------------------- */

const persistedReducer = loadState();

// Esta línea es para conectar con la extensión del navegador => REDUX DEVTOOLS
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  persistedReducer,
  composeEnhancer(applyMiddleware(thunk)) // Esta línea es para poder hacer peticiones a un server
);

store.subscribe(() => {
  saveState(store.getState());
});
/* ------------------------------------------------------------- */
