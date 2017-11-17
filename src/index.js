import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store.js";
import ChessModule from "./components/ChessModule";

// render the main component
ReactDOM.render(
  <Provider store={store}>
    <ChessModule />
  </Provider>,
  document.getElementById('chessModuleParent')
);
