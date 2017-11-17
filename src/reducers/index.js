import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import gameStateReducer from './gameStateReducer';
import uiReducer from './uiReducer';

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  gameState: gameStateReducer,
  ui: uiReducer
});
