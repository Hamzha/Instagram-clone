import React from "react";

export default function CreatePost() {
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
      <input type="text" placeholder="title" />
      <input type="text" placeholder="body" />
      <div className="file-field input-field">
        <div className="btn #039be5 light-blue darken-1">
          <span>Upload Image</span>
          <input type="file" />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate " type="text" />
        </div>
      </div>
      <button className="btn waves-effect waves-light #039be5 light-blue darken-1">
        Submit Post
      </button>
    </div>
  );
}
