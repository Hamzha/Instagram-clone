import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";

const axios = require("axios");

export default function Signup() {
  const [name, setName] = useState("");
  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState('')
  const [url, setUrl] = useState('')
  const navigate = useNavigate();

  const uploadPic = () => {
    var formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "insta-clone");
    formData.append("cloud_name", "roshnihomes");
    axios
      .post("https://api.cloudinary.com/v1_1/roshnihomes/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setUrl(res.data.url);
        // uploadFields()
      }).catch((err) => { console.log(err) })
  }

  const uploadFields = () => {
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
        pic: url
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
  }
  useEffect(() => {
    if (url) {
      uploadFields()
    }
  }, [url])

  const postData = () => {
    if (image) {
      uploadPic()
    } else {
      uploadFields()
    }


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
        <div className="file-field input-field">
          <div className="btn #039be5 light-blue darken-1">
            <span>Upload Pic</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate " type="text" />
          </div>
        </div>
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
