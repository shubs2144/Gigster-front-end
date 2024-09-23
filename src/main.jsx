import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
Sentry.init({
  dsn: "https://48236d8289769550df13f4f515de8c72@o4505879923720192.ingest.sentry.io/4505879926865920",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 0.2,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={<p>This is a fallback</p>}>
      <App />
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);
