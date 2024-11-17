import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import "./index.css";
import App from './App.tsx'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const domNode = document.getElementById("root") as HTMLDivElement;
const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    {/* <Provider> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>
);
