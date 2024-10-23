import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { store } from "./Store.tsx";
import { Provider } from "react-redux";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import ReactGA from "react-ga4";

ReactGA.initialize("G-RWXX1LBDSG");

ReactGA.send({
  hitType: "pageview",
  page: window.location.pathname,
});

posthog.init('phc_FfxugPbfWc8Al71t7xnLlYZK0H3keOozhI5nq19YM2z', { api_host: 'https://us.i.posthog.com', person_profiles: 'always', capture_pageview: false, }) //prettier-ignore

posthog.capture("$pageview", { domain: window.location.hostname });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PostHogProvider client={posthog}>
        <App />
      </PostHogProvider>
    </Provider>
  </React.StrictMode>
);
