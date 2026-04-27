import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AudioProvider } from "./context/AudioContext";
import { LanguageProvider } from "./context/LanguageContext";
import Analytics from "./components/Analytics";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AudioProvider>
        <LanguageProvider>
          <Analytics />
          <App />
        </LanguageProvider>
      </AudioProvider>
    </BrowserRouter>
  </StrictMode>
);
