import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./utils/ThemeContext.jsx";
import { AppProvider } from "./hooks/useApp.jsx";

const rootElement = document.getElementById("root");

const renderApp = () => {
  ReactDOM.createRoot(rootElement).render(
    <ThemeProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </ThemeProvider>
  );
};

const errorHandler = (error) => {
  console.error("Error rendering React application:", error);
};

try {
  renderApp();
} catch (error) {
  errorHandler(error);
}
