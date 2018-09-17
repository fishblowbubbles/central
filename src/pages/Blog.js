import React, { Component } from "react";
import { Book, FormNext } from "grommet-icons";
import { Background } from "../components/Background.js";
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
    let visible = this.state.postOpen ? "show" : "hide";
    return (
      <div className="blog">
        <div id={visible} className="blog-navigation" />
        <div id={visible} className="blog-center">
          <Background src="/assets/hkust.jpg" />
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
        <div id={visible} className="blog-posts">
          {this.displayToggleButton()}
        </div>
      </div>
    );
  }
}
