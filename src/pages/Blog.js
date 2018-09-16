import React, { Component } from "react";
import { Book, FormNext } from "grommet-icons";
import { RectangleButton, SquareButton } from "../components/Buttons.js";
// import { Construction } from "../components/Error.js";
import "../stylesheets/Blog.css";

export class Blog extends Component {
  state = {
    postOpen: false
  };

  handleCenterClick = e => {
    console.log("click!");
    if (this.state.postOpen) {
      this.togglePost();
    }
  };

  togglePost = () => {
    this.setState({
      postOpen: !this.state.postOpen
    });
  };

  displayCategories = () => <div />;

  render() {
    return (
      <div className="blog">
        <div
          id={this.state.postOpen ? "show" : "hide"}
          className="blog-navigation-panel"
        />
        <div
          id={this.state.postOpen ? "show" : "hide"}
          className="blog-center-panel"
          onClick={this.handleCenterClick}
        >
          <div className="blog-center-panel-background" />
          <div className="blog-center-panel-content">
            <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit</h1>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium at repellendus fuga expedita odio nostrum sequi optio
              facere earum illum!
            </p>
          </div>
        </div>
        <div
          id={this.state.postOpen ? "show" : "hide"}
          className="blog-post-panel"
        >
          {this.state.postOpen ? (
            <SquareButton
              id="post-close"
              icon={<FormNext />}
              handleClick={this.togglePost}
            />
          ) : (
            <RectangleButton
              id="post-open"
              icon={<Book />}
              text="R E A D"
              handleClick={this.togglePost}
            />
          )}
        </div>
      </div>
    );
  }
}
