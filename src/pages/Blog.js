import React, { Component } from "react";
import { Book, FormNext } from "grommet-icons";
import { Accordion } from "../components/Accordion.js";
import {
  PanelButton,
  RectangleButton,
  SquareButton
} from "../components/Buttons.js";
import Posts from "../content/Posts.js";
import "../stylesheets/Blog.less";

export class Blog extends Component {
  state = {
    postsOpen: false,
    current: Posts[0].posts[0]
  };

  handleLinkClick = (e, x, y) => {
    const category = Posts[x];
    const post = category.posts[y];

    this.setState({
      current: post
    });
  };

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
    Posts.map((category, x) => (
      <Accordion heading={category.name}>
        {category.posts.map((post, y) => (
          <div
            className="blog-link"
            onClick={e => this.handleLinkClick(e, x, y)}
          >
            {post.title}
          </div>
        ))}
      </Accordion>
    ));

  displayCurrentHero = () => (
    <div className="blog-hero-content">
      <h1>{this.state.current.title}</h1>
      <h3>{this.state.current.description}</h3>
      <h5>{this.state.current.date}</h5>
    </div>
  );

  displayCurrentPost = () =>
    this.state.current.content.map(section => (
      <div className="blog-post-content-section">
        <div className="blog-post-content-section-heading">
          <h2>{section.heading}</h2>
        </div>
        <div className="blog-post-content-section-text">
          <p>{section.text}</p>
        </div>
        <div className="blog-post-content-section-image">
          <img src={section.image} alt="" />
        </div>
      </div>
    ));

  render() {
    const visible = this.state.postsOpen ? "show" : "hide";
    return (
      <div className="blog">
        <div id={visible} className="blog-navigation">
          <div className="blog-navigation-accordions">
            <div className="blog-navigation-latest">
              <h2>L A T E S T</h2>
              {this.displayLatestPosts()}
            </div>
            <div className="blog-navigation-categories">
              <h2>A L L</h2>
              {this.displayAllCategories()}
            </div>
          </div>
        </div>
        <div id={visible} className="blog-hero">
          {this.displayCurrentHero()}
        </div>
        <div id={visible} className="blog-post">
          {this.displayToggleButton()}
          <div className="blog-post-content">{this.displayCurrentPost()}</div>
        </div>
      </div>
    );
  }
}
