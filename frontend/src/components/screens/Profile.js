import React from "react";

export default function Profile() {
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
            src="https://images.unsplash.com/photo-1523983254932-c7e6571c9d60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
          />
        </div>
        <div>
          <h4>Hamza Ahmed</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6>40 Posts</h6>
            <h6>40 Followers</h6>
            <h6>40 Following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        <img
          className="item"
          src="https://images.unsplash.com/photo-1429114753120-0733a750d6c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
        />
        <img
          className="item"
          src="https://images.unsplash.com/photo-1429114753120-0733a750d6c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
        />
        <img
          className="item"
          src="https://images.unsplash.com/photo-1429114753120-0733a750d6c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
        />
        <img
          className="item"
          src="https://images.unsplash.com/photo-1429114753120-0733a750d6c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
        />
        <img
          className="item"
          src="https://images.unsplash.com/photo-1429114753120-0733a750d6c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
        />
        <img
          className="item"
          src="https://images.unsplash.com/photo-1429114753120-0733a750d6c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
        />
        <img
          className="item"
          src="https://images.unsplash.com/photo-1429114753120-0733a750d6c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
        />
      </div>
    </div>
  );
}
