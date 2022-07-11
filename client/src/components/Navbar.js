import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="container">
      <nav className="nav justify-content-center">
        <ul className="nav justify-content-center">
          <li className="nav-item">
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
    </div>
  );
}
export default Navbar;
