import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="Navbar">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/AddGroceryList">Add Grocery List</NavLink>
        </li>
        <li>
          <NavLink to="/myLists">My lists</NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
