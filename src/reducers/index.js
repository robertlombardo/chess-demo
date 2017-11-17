import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import gameBoardReducer from './gameBoardReducer';
import uiReducer from './uiReducer';

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  game_board: gameBoardReducer,
  ui: uiReducer
});
