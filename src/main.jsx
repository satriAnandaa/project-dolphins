import React from "react";
import ReactDOM from "react-dom/client"; 
import App from "./App"; 
import { AuthProvider } from "./context/AuthContext"; // AuthProvider to wrap the app
import "./index.css"; 

const root = ReactDOM.createRoot(document.getElementById("root")); // Create root using createRoot

root.render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap the app with AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
