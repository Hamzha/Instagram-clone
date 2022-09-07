import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div className="nav-wrapper white" style={{ color: "black" }}>
        <Link to="/" className="brand-logo left">
          Instagram
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/create">Create Post</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
