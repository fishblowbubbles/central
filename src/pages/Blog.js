import React, { Component } from "react";
import { Book, FormNext } from "grommet-icons";
import { Accordion } from "../components/Accordion.js";
import { Background } from "../components/Background.js";
import { RectangleButton, SquareButton } from "../components/Buttons.js";
import Posts from "../content/Posts.js";
import "../stylesheets/Blog.less";

export class Blog extends Component {
  state = {
    postsOpen: false,
    current: Posts[0].posts[0],
    numLatest: 4
  };

  handleLinkClick = (e, x, y) => {
    const category = Posts[x];
    const post = category.posts[y];

    this.setState({
      current: post
    });
  };

  handleShowMoreClick = () => {
    this.setState({
      numLatest: this.state.numLatest + 4
    });
  };

  togglePost = () => {
    this.setState({
      postsOpen: !this.state.postsOpen
    });
  };

  fetchLatestPosts = n => {
    let latest = [];
    for (let i = 0; i < Posts.length; i++) {
      let posts = Posts[i].posts;
      for (let j = 0; j < posts.length; j++)
        latest.push({
          title: posts[j].title,
          date: posts[j].date,
          position: {
            x: i,
            y: j
          }
        });
    }

    return latest
      .sort((self, other) => new Date(other.date) - new Date(self.date))
      .slice(0, n);
  };

  render() {
    const visible = this.state.postsOpen ? "show" : "hide";
    return (
      <div className="blog">
        <div id={visible} className="blog-navigation">
          <div className="blog-navigation-latest">
            <div className="blog-navigation-latest-heading">
              <h2>L A T E S T</h2>
            </div>
            <div className="blog-navigation-latest-items">
              {this.fetchLatestPosts(this.state.numLatest).map(post => (
                <div
                  className="blog-link"
                  onClick={e =>
                    this.handleLinkClick(e, post.position.x, post.position.y)
                  }
                >
                  <p>{post.title}</p>
                  <small>{post.date}</small>
                </div>
              ))}
            </div>
          </div>
          <div className="blog-navigation-categories">
            <div className="blog-navigation-categories-heading">
              <h2>A L L</h2>
            </div>
            <div className="blog-navigation-categories-items">
              {Posts.map((category, x) => (
                <Accordion heading={category.name}>
                  {category.posts.map((post, y) => (
                    <div
                      className="blog-link"
                      onClick={e => this.handleLinkClick(e, x, y)}
                    >
                      <p>{post.title}</p>
                      <small>{post.date}</small>
                    </div>
                  ))}
                </Accordion>
              ))}
            </div>
          </div>
        </div>
        <div id={visible} className="blog-hero">
          <Background src="/assets/highwest.jpg" />
          <div className="blog-hero-content">
            <h1>{this.state.current.title}</h1>
            <h3>{this.state.current.description}</h3>
            <h5>{this.state.current.date}</h5>
          </div>
        </div>
        <div id={visible} className="blog-post">
          {this.state.postsOpen ? (
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
          )}
          <div className="blog-post-content">
            {this.state.current.content.map(section => (
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
            ))}
          </div>
        </div>
      </div>
    );
  }
}
