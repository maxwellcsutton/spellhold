import React from "react";
import { NavLink } from "react-router-dom";
import "../css/Navbar.css";

function NavBar() {
  return (
    <div className="navbar">
      <NavLink to="/" className="Sidebar-text">
        Address, Hours, and Event Schedule
      </NavLink>
      <div>|</div>
      <NavLink to="/pricing" className="Sidebar-text">
        Pricing Tool
      </NavLink>
      <div>|</div>
      <NavLink to="/prizing" className="Sidebar-text">
        Weekly Event Prizing
      </NavLink>
      <div>|</div>
      <NavLink to="/parking" className="Sidebar-text">
        Parking Map
      </NavLink>
      <div>|</div>
      <NavLink to="/food" className="Sidebar-text">
        Local Food
      </NavLink>
    </div>
  );
}

export default NavBar;
