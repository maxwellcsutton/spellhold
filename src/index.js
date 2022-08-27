import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./components/App";
import HoursAndEvents from "./components/HoursAndEvents.js";
import Prizing from "./components/Prizing";
import Parking from "./components/Parking.js";
import Food from "./components/Food";
import Pricing from "./components/Pricing.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App component={<HoursAndEvents />} />} />
        <Route path="/prizing" element={<App component={<Prizing />} />} />
        <Route path="/parking" element={<App component={<Parking />} />} />
        <Route path="/food" element={<App component={<Food />} />} />
        <Route path="/pricing" element={<App component={<Pricing />} />} />
      </Routes>
    </React.StrictMode>
  </Router>
);
