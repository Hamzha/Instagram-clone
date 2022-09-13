import React, { useState } from "react";
import M from "materialize-css";

const axios = require("axios");

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const postDetails = () => {
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
      .then(function (res) {
        axios({
          method: "post",
          url: "http://localhost:5000/createpost",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          data: JSON.stringify({
            title,
            body,
            url: res.data.url,
          }),
        })
          .then(function (response) {
            // handle success
            M.toast({
              html: "Post Created!",
              classes: "#0277bd light-blue darken-3",
            });
            // navigate("/login");
          })
          .catch(function (error) {
            console.log(error);
            // handle error
            M.toast({
              html: error.response.data.error,
              classes: "#f44336 red",
            });
          })
          .then(function () {
            // always executed
          });
        // setUrl();
      })
      .catch(function (err) {
        console.log("FAILURE!!", err);
      });
  };
  return (
    <div
      className="card input-filed"
      style={{
        margin: "30px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn #039be5 light-blue darken-1">
          <span>Upload Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate " type="text" />
        </div>
      </div>
      <button
        className="btn waves-effect waves-light #039be5 light-blue darken-1"
        onClick={postDetails}
      >
        Submit Post
      </button>
    </div>
  );
}
