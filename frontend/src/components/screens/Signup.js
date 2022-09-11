import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";

const axios = require("axios");

export default function Signup() {
  const [name, setName] = useState("");
  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const postData = () => {
    if (validateEmail(email) == false)
      return M.toast({ html: "Invalid Email", classes: "#f44336 red" });
    axios({
      method: "post",
      url: "http://localhost:5000/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then(function (response) {
        // handle success
        M.toast({
          html: response.data.message,
          classes: "#0277bd light-blue darken-3",
        });
        navigate("/login");
      })
      .catch(function (error) {
        // handle error
        M.toast({ html: error.response.data.message, classes: "#f44336 red" });
      })
      .then(function () {
        // always executed
      });
  };
  function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }
  return (
    <div className="mycard">
      <div className="input-field card auth-card">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPasword(e.target.value);
          }}
        />
        <button
          className="btn waves-effect waves-light #039be5 light-blue darken-1"
          onClick={() => postData()}
        >
          Signup
        </button>
        <h5>
          <Link to="/login">Already have an account?</Link>
        </h5>
      </div>
    </div>
  );
}
