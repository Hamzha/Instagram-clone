import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
const axios = require("axios");

export default function Home() {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:5000/allpost",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }).then((res) => {
      setData(res.data);
    });
  }, []);

  const likePost = (id) => {
    axios({
      method: "put",
      url: "http://localhost:5000/like",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      data: JSON.stringify({
        postId: id,
      }),
    })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        const newData = data.map((item) => {
          if (item._id == res.data._id) return res.data;
          else return item;
        });
        setData(newData);
      });
  };

  const unlikePost = (id) => {
    axios({
      method: "put",
      url: "http://localhost:5000/unlike",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      data: JSON.stringify({
        postId: id,
      }),
    })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        const newData = data.map((item) => {
          if (item._id == res.data._id) return res.data;
          else return item;
        });
        setData(newData);
      });
  };

  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5>{item.postedBy.name}</h5>
            <div className="card-image">
              <img src={item.photo} />
            </div>
            <div className="card-content">
              <i className="material-icons" style={{ color: "red" }}>
                favorite
              </i>
              {item.likes.includes(state._id) ? (
                <i
                  className="material-icons"
                  onClick={() => unlikePost(item._id)}
                >
                  thumb_down
                </i>
              ) : (
                <i
                  className="material-icons"
                  onClick={() => likePost(item._id)}
                >
                  thumb_up
                </i>
              )}

              <h6>{item.likes.length}</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              <input type="text" placeholder="add comment" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
