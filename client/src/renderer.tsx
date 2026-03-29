import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./renderer/App";
import "./index.css";
import { AuthProvider } from "./renderer/context/AuthProvider";
import { Toaster } from "react-hot-toast";
import React from "react";

const Main = () => {
  return (
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <App />
          <Toaster position="bottom-right" reverseOrder={false} toastOptions={{
            duration: 3000
          }} />
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Main />);
