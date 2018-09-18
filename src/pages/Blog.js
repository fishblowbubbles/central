import React, { Component } from "react";
import { Book, FormNext } from "grommet-icons";
import { Accordion } from "../components/Accordion.js";
import { Background } from "../components/Background.js";
import {
  PanelButton,
  RectangleButton,
  SquareButton
} from "../components/Buttons.js";
import { Posts } from "../content/Posts.js";
import "../stylesheets/Blog.css";

export class Blog extends Component {
  posts = Posts;
  latest = [];
  current = [];

  state = {
    postsOpen: false
  };

  /**
   * TODO: Change content of posts panel accordingly.
   */
  handleLinkClick = e => {};

  togglePost = () => {
    this.setState({
      postsOpen: !this.state.postsOpen
    });
  };

  displayToggleButton = () =>
    this.state.postsOpen ? (
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

  /**
   * TODO : Search categories for n latest posts,
   * saving their positions in the list this.latest
   */
  fetchLatestPosts = n => {};

  displayLatestPosts = () => {};

  displayAllCategories = () =>
    this.posts.map(category => (
      <div className="blog-navigation-category">
        <Accordion heading={category.name} startState="open">
          {category.posts.map(post => (
            <PanelButton
              id="blog-link"
              text={post.title}
              handleClick={this.handleLinkClick}
            />
          ))}
        </Accordion>
      </div>
    ));

  render() {
    const visible = this.state.postsOpen ? "show" : "hide";
    return (
      <div className="blog">
        <div id={visible} className="blog-navigation">
          <div className="blog-navigation-latest">
            <Accordion heading="L A T E S T" startState="open">
              <PanelButton
                id="blog-link"
                text="Link 1"
                handleClick={this.handleLinkClick}
              />
              <PanelButton
                id="blog-link"
                text="Link 2"
                handleClick={this.handleLinkClick}
              />
            </Accordion>
          </div>
          {this.displayAllCategories()}
          <div className="blog-navigation-categories" />
        </div>
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
