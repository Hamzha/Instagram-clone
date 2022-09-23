import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
const axios = require("axios");

export default function Profile() {
  const [posts, setPosts] = useState([]);

  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:5000/mypost",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }).then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div
      style={{
        maxWidth: "550px",
        margin: "0px auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",

          borderBottom: "1px solid gray",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src={state ? state.pic : 'Loading'}
          />
        </div>
        <div>
          <h4>{state.name}</h4>
          <h5>{state.email}</h5>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6>{posts.length} Posts</h6>
            <h6>{state.followers.length} Followers</h6>
            <h6>{state.following.length} Following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        {posts.map((item) => {
          return <img key={item._id} className="item" src={item.photo} />;
        })}
      </div>
    </div>
  );
}
