import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  const comment = (text, id) => {
    axios({
      method: "put",
      url: "http://localhost:5000/comment",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      data: JSON.stringify({
        postId: id,
        text: text,
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

  const deletePost = (postId) => {
    axios({
      method: "delete",
      url: "http://localhost:5000/deletePost/" + postId,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        console.log(res);
        const newData = data.filter((item) => {
          return item._id != res.data.result._id;
        });
        setData(newData);
      });
  };

  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5 style={{ padding: '10px' }}>
              <Link
                to={
                  item.postedBy._id !== state._id
                    ? "/profile/" + item.postedBy._id
                    : "/profile"
                }
              >
                {item.postedBy.name}
              </Link>
              {item.postedBy._id == state._id ? (
                <i
                  className="material-icons"
                  onClick={() => {
                    deletePost(item._id);
                  }}
                  style={{ float: "right" }}
                >
                  delete
                </i>
              ) : (
                <></>
              )}
            </h5>

            <div className="card-image">
              <img src={item.photo} />
            </div>
            <div style={{ padding: '10px' }} className="card-content">
              <i className="material-icons">favorite</i>
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
              {item.comments.map((record) => {
                return (
                  <h6>
                    <span style={{ fontWeight: "600" }}>
                      {record.postedBy.name}
                    </span>{" "}
                    {record.text}
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  comment(e.target[0].value, item._id);
                }}
              >
                <input type="text" placeholder="add comment" />
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
}
