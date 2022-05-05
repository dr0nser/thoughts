import React from "react";
import profilePicture from "../asset/default.jpg";

const ThoughtPost = ({ message }) => {
  return (
    <li className="post">
      <img className="profile-pic m-2" src={profilePicture} alt="" />
      <div className="post-view">
        <div className="profile-details">
          <h2 className="profile-name">Souvik Das</h2>
          <h2 className="twitter-handle">@souvikstwt</h2>
          <span className="dot">·</span>
          <h2 className="post-date">Dec 19, 2021</h2>
        </div>
        <span className="tweet-data">{message}</span>
      </div>
    </li>
  );
};

export default ThoughtPost;
