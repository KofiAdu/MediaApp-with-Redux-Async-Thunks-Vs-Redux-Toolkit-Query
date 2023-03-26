import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
//connecting redux store to react app
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
