import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-loading-skeleton/dist/skeleton.css";

import "./index.css";
import "./styles/dashboard.css";
import "./styles/sidebar.css";
import "./styles/theme.css";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>

    <App />

</ThemeProvider>
      <ToastContainer
    position="top-right"
    autoClose={2500}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnHover
/>
    </AuthProvider>
  </React.StrictMode>
);