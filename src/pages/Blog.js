import React, { Component } from "react";
import { Book, FormNext } from "grommet-icons";
import { Accordion } from "../components/Accordion.js";
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
  current = [0, 0];

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

  displayCurrentPost = () => {
    const post = this.posts[this.current[0]].posts[this.current[1]];
    return post.content.map(section => (
      <div className="blog-post-section">
        <div className="blog-post-section-heading">
          <h1>{section.heading}</h1>
        </div>
        <div className="blog-post-section-text">
          <p>{section.text}</p>
        </div>
        <div className="blog-post-section-image">
          <img src={section.image} alt="" />
        </div>
      </div>
    ));
  };

  render() {
    const visible = this.state.postsOpen ? "show" : "hide";
    return (
      <div className="blog">
        <div id={visible} className="blog-navigation">
          <div className="blog-navigation-accordions">
            <div className="blog-navigation-latest">
              <h2>L A T E S T</h2>
              <br />
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
            </div>
            <div className="blog-navigation-categories">
              <h2>C A T E G O R I E S</h2>
              {this.displayAllCategories()}
            </div>
          </div>
        </div>
        <div id={visible} className="blog-center">
          <div className="blog-center-content">
            <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit</h1>
            <h3>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium at repellendus fuga expedita odio nostrum sequi optio
              facere earum illum!
            </h3>
            <h5>18 September 2018</h5>
          </div>
        </div>
        <div id={visible} className="blog-post">
          <div className="blog-post-content">
            {this.displayToggleButton()}
            {this.displayCurrentPost()}
          </div>
        </div>
      </div>
    );
  }
}
