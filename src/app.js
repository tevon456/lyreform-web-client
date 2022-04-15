import "./styles/app.css";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Content } from "./components";
import { ToastContainer } from "react-toastify";
import ApplicationRoutes from "./route/ApplicationRoutes";

export default function App() {
  const links = [
    { type: "link", to: "/login", text: "Login" },
    { type: "buttonPrimary", to: "/signup", text: "Signup" },
  ];

  return (
    <Router>
      <Content.Navbar links={links} />
      <ApplicationRoutes />
      <ToastContainer hideProgressBar={true} />
    </Router>
  );
}
