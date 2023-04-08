import React from "react";
import { createReduxEntry } from "redux-entry";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import App from "./App";
import "./index.css";

import { entryMap } from "./actions";
import reducers from "./reducers";

const reduxEntry = createReduxEntry();

const store = configureStore({
  reducer: reducers,
  middleware: [reduxEntry.middleware],
});

reduxEntry.setEntryMap(entryMap);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// import reportWebVitals from './reportWebVitals';
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
