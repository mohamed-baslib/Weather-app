import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./contexts/ThemeProvider.jsx";
import "./i18n";
import { LanguageProvider } from "./contexts/LanguageProvider.jsx";
import { WeatherProvider } from "./contexts/WeatherProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <WeatherProvider>
          <App />
        </WeatherProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
);
