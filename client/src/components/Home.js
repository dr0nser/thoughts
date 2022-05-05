import React from "react";
import axios from "axios";
import profilePicture from "../asset/default.jpg";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thoughts: [],
      message: "",
      thoughtPic: "",
    };
    this.handleMessage = this.handleMessage.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageButtonClick = this.handleImageButtonClick.bind(this);
  }
  handleMessage(e) {
    this.setState({
      message: e.target.value,
    });
  }
  handleImage(e) {
    this.setState({
      thoughtPic: e.target.files[0],
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.message || this.state.thoughtPic) {
      const formData = new FormData();
      formData.append("image", this.state.thoughtPic);
      formData.append("message", this.state.message);
      fetch("http://localhost:5000", {
        method: "POST",
        body: formData,
      });
      this.setState({
        thoughts: [
          ...this.state.thoughts,
          { message: this.state.message, thoughtPic: this.state.thoughtPic },
        ],
      });
      this.setState({
        message: "",
        thoughtPic: "",
      });
    }
  }
  handleImageButtonClick(e) {
    var imageInput = document.getElementById("postImage");
    imageInput.click();
  }
  getData() {
    axios
      .get("http://localhost:5000")
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        this.setState({
          thoughts: data,
        });
      });
  }

  // lifecycle methods
  componentDidMount() {
    this.getData();
    console.log("component did mount called...");
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      !prevState ||
      Object.keys(prevState.thoughts).length !==
        Object.keys(this.state.thoughts).length
    ) {
      this.getData();
      console.log("component did update called...");
    }
  }

  render() {
    return (
      <div className="home">
        <form
          method="POST"
          className="tweet-form"
          onSubmit={this.handleSubmit}
          encType="multipart/form-data"
        >
          <div className="input-div">
            <img className="profile-pic" src={profilePicture} alt="" />
            <input
              className="tweet-input"
              type="text"
              placeholder="What are you thinking ?"
              value={this.state.message ?? ""}
              onChange={this.handleMessage}
            />
          </div>
          <div className="functions">
            {/* <label htmlFor="postImage"> */}
            {/* <button
                className="btn-add-image"
                onClick={this.handleImageButtonClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </label> */}
            <input
              id="postImage"
              name="postImage"
              type="file"
              // style={{ display: "none" }}
              // onChange={this.handleImage}
              onChange={(e) => this.setState({ thoughtPic: e.target.files[0] })}
            />
            <button className="btn-tweet" type="submit">
              Post
            </button>
          </div>
        </form>
        <ul>
          {this.state.thoughts.map((thought, index) => {
            return (
              <li key={index} className="post">
                <img className="profile-pic m-2" src={profilePicture} alt="" />
                <div className="post-view">
                  <div className="profile-details">
                    <h2 className="profile-name">Souvik Das</h2>
                    <h2 className="twitter-handle">@souvikstwt</h2>
                    <span className="dot">·</span>
                    <h2 className="post-date">Dec 19, 2021</h2>
                  </div>
                  <span className="tweet-data">{thought.message}</span>
                  <img src={"./"} alt="" />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Home;
