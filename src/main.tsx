import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import store from "./Store.tsx";
import { Provider } from "react-redux";

console.log(store.getState());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
