import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ParallaxProvider } from 'react-scroll-parallax';
import { LanguageProvider } from "./context/LanguageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <HashRouter>
          <ParallaxProvider isDisabled={false}>
            <App />
          </ParallaxProvider>
        </HashRouter>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
