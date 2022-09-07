import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="mycard">
      <div className="input-field card auth-card">
        <h2>Instagram</h2>
        <input type="text" placeholder="name" />

        <input type="text" placeholder="email" />

        <input type="text" placeholder="password" />

        <button className="btn waves-effect waves-light #039be5 light-blue darken-1">
          Signup
        </button>
        <h5>
          {" "}
          <Link to="/login">Already have an account?</Link>
        </h5>
      </div>
    </div>
  );
}
