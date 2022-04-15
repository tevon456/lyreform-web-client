import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { AppProvider } from "./context";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: "https://3b0c5ce555924264ac5cbca1e7e18d00@o309617.ingest.sentry.io/5638355",
  release: "lyreform@" + process.env.npm_package_version,
  integrations: [new Integrations.BrowserTracing()],
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <Sentry.ErrorBoundary
    fallback={() => {
      return <>"An error has occurred"</>;
    }}
  >
    <AppProvider>
      <App />
    </AppProvider>
  </Sentry.ErrorBoundary>,
  document.getElementById("root")
);
