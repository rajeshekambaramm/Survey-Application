import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./index.css";
import "./styles/dashboard.css";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnHover
/>
    </AuthProvider>
  </React.StrictMode>
);