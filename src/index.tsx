import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import "./index.css";
import App from './App.tsx'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./utils/store.ts";

const domNode = document.getElementById("root") as HTMLDivElement;
const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
