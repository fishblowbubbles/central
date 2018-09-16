import React, { Component } from "react";
import { Book, FormNext } from "grommet-icons";
import { RectangleButton, SquareButton } from "../components/Buttons.js";
// import { Construction } from "../components/Error.js";
import "../stylesheets/Blog.css";

export class Blog extends Component {
  state = {
    postOpen: false
  };

  togglePost = () => {
    this.setState({
      postOpen: !this.state.postOpen
    });
  };

  displayCategories = () => <div />;

  displayToggleButton = () =>
    this.state.postOpen ? (
      <SquareButton
        id="posts-close"
        icon={<FormNext />}
        handleClick={this.togglePost}
      />
    ) : (
      <RectangleButton
        id="posts-open"
        icon={<Book />}
        text="R E A D"
        handleClick={this.togglePost}
      />
    );

  render() {
    return (
      <div className="blog">
        <div
          id={this.state.postOpen ? "show" : "hide"}
          className="blog-navigation"
        />
        <div id={this.state.postOpen ? "show" : "hide"} className="blog-center">
          <div className="blog-center-background" />
          <div className="blog-center-content">
            <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit</h1>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium at repellendus fuga expedita odio nostrum sequi optio
              facere earum illum!
            </p>
          </div>
        </div>
        <div id={this.state.postOpen ? "show" : "hide"} className="blog-posts">
          {this.displayToggleButton()}
        </div>
      </div>
    );
  }
}
