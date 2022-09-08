import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="mycard">
      <div className="input-field card auth-card">
        <h2>Instagram</h2>
        <input type="text" placeholder="email" />
        <input type="text" placeholder="password" />
        <button className="btn waves-effect waves-light #039be5 light-blue darken-1">
          Login
        </button>
        <h5>
          <Link to="/signup">Don't have an account?</Link>
        </h5>
      </div>
    </div>
  );
}
