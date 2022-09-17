import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
export default function Navbar() {
  const { state, dispatch } = useContext(UserContext);
  const renderList = () => {
    if (state) {
      return [
        <li>
          <Link to="/profile">Profile</Link>
        </li>,
        <li>
          <Link to="/createPost">Create Post</Link>
        </li>,
        <li>
          <button
            className="btn waves-effect waves-light #039be5 light-blue darken-1"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
            }}
          >
            Logout``
          </button>
        </li>,
      ];
    } else {
      return [
        <li>
          <Link to="/login">Login</Link>
        </li>,
        <li>
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };
  return (
    <nav>
      <div className="nav-wrapper white" style={{ color: "black" }}>
        <Link to={state ? "/" : "/login"} className="brand-logo left">
          Instagram
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
}
