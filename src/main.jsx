import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";

import App from "./App.jsx";
import "./styles/global.css";

registerSW({
  immediate: true,

  onNeedRefresh() {
    console.log("New version available");
  },

  onOfflineReady() {
    console.log("Neidah is ready offline");
  },
});

createRoot(
  document.getElementById("root")
).render(
  <StrictMode>
    <App />
  </StrictMode>
);