import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
const axios = require("axios");

export default function UserProfile() {
  const [profile, setProfile] = useState();
  const { state, dispatch } = useContext(UserContext);
  const { userId } = useParams();
  const [showFollow, setShowFollow] = useState(true)
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

  const follow = () => {
    axios({
      method: "put",
      url: "http://localhost:5000/follow",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      data: JSON.stringify({
        followId: userId,
      }),
    })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        dispatch({ type: 'UPDATE', payload: { following: res.data.following, followers: res.data.followers } })
        localStorage.setItem('user', JSON.stringify(
          res.data))
        console.log(res)
        setProfile((prevState) => {
          return {
            ...prevState, user: { ...prevState.user, followers: [...prevState.user.followers, res.data._id] }
          }
        })
        setShowFollow(false)
      });
  }
  const unFollow = () => {
    axios({
      method: "put",
      url: "http://localhost:5000/unfollow",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      data: JSON.stringify({
        followId: userId,
      }),
    })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        dispatch({ type: 'UPDATE', payload: { following: res.data.following, followers: res.data.followers } })
        localStorage.setItem('user', JSON.stringify(
          res.data))

        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(item => item != res.data._id)
          console.log(newFollower)
          return {
            ...prevState, user: { ...prevState.user, followers: newFollower }
          }
        })
        setShowFollow(true)
      });
  }
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
                <h6>{profile.user.followers.length} Followers</h6>
                <h6>{profile.user.following.length} Following</h6>
                {showFollow ? <button
                  className="btn waves-effect waves-light #039be5 light-blue darken-1"
                  onClick={follow}
                >
                  Follow
                </button> : <button
                  className="btn waves-effect waves-light #039be5 light-blue darken-1"
                  onClick={unFollow}
                >
                  Unfollow
                </button>}

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
