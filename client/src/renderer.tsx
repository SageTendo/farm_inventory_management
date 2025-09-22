import { createTRPCProxyClient } from "@trpc/client";
// eslint-disable-next-line import/no-unresolved
import { ipcLink } from "electron-trpc/renderer";
import type { AppRouter } from "./shared/ipc";

import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./renderer/App";
import "./index.css";

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [ipcLink()],
  transformer: {
    serialize: (data: unknown) => JSON.stringify(data),
    deserialize: (data: string) => JSON.parse(data),
  },
});

const Main = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Main />);
