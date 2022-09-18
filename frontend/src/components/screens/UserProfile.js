import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
const axios = require("axios");

export default function UserProfile() {
  const [profile, setProfile] = useState();
  const { state, dispatch } = useContext(UserContext);
  const { userId } = useParams();

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/user/" + userId,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }).then((res) => {
      setProfile(res.data);
      // console.log(res.data);
    });
  }, []);

  console.log(userId);
  return (
    <>
      {profile ? (
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
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "80px",
                }}
                src="https://images.unsplash.com/photo-1523983254932-c7e6571c9d60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
              />
            </div>
            <div>
              <h4>{profile.user.name}</h4>
              <h5>{profile.user.email}</h5>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%",
                }}
              >
                <h6>{profile.posts.length} Posts</h6>
                <h6>40 Followers</h6>
                <h6>40 Following</h6>
              </div>
            </div>
          </div>
          <div className="gallery">
            {profile.posts.map((item) => {
              return <img className="item" src={item.photo} />;
            })}
          </div>
        </div>
      ) : (
        <h2>Loading</h2>
      )}
    </>
  );
}
