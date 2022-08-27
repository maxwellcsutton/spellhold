import React from "react";
import { NavLink } from "react-router-dom";
import "../css/Navbar.css";

function NavBar() {
  return (
    <div className="App-sidebar">
      <NavLink to="/" className="Sidebar-text">
        Address, Hours, and Event Schedule
      </NavLink>
      <br />
      <br />
      <NavLink to="/pricing" className="Sidebar-text">
        Pricing Tool
      </NavLink>
      <br />
      <br />
      <NavLink to="/prizing" className="Sidebar-text">
        Weekly Event Prizing
      </NavLink>
      <br />
      <br />
      <NavLink to="/parking" className="Sidebar-text">
        Parking Map
      </NavLink>
      <br />
      <br />
      <NavLink to="/food" className="Sidebar-text">
        Local Food
      </NavLink>
    </div>
  );
}

export default NavBar;
