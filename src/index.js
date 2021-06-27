import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store";

// Application with connected store
const ConnectedApp = ({ Component }) => (
  <Provider store={store}>
    <Component />
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>
    <ConnectedApp Component={App} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
