import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { store } from "./Store.tsx";
import { Provider } from "react-redux";

import ReactGA from "react-ga4";

ReactGA.initialize("G-RWXX1LBDSG");

ReactGA.send({
  hitType: "pageview",
  page: window.location.pathname,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
