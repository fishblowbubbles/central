import React, { Component } from "react";
import { Book, FormNext } from "grommet-icons";
import { Accordion } from "../components/Accordion.js";
import { RectangleButton, SquareButton } from "../components/Buttons.js";
import { Slider } from "../components/Slider.js";
import Posts from "../content/Posts.js";
import "../stylesheets/Blog.less";

export class Blog extends Component {
  state = {
    postOpen: false,
    category: Posts[0].name,
    current: Posts[0].posts[0],
    numLatest: 4
  };

  handleLinkClick = (e, x, y) => {
    const category = Posts[x];
    const post = category.posts[y];

    this.setState({
      category: category.name,
      current: post
    });
  };

  handleReadClick = e => {
    if (!this.state.postOpen) this.togglePost();
    e.stopPropagation();
  };

  handleHeroClick = e => {
    if (this.state.postOpen) this.togglePost();
  };

  handleShowMoreClick = e => {
    this.setState({
      numLatest: this.state.numLatest + 4
    });
  };

  togglePost = () => {
    this.setState({
      postOpen: !this.state.postOpen
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
    const visible = this.state.postOpen ? "show" : "hide";
    return (
      <div className="blog">
        <div id={visible} className="blog-navigation">
          <div className="blog-navigation-latest">
            <div className="blog-navigation-latest-heading">
              <h2>L A T E S T</h2>
            </div>
            <div className="blog-navigation-latest-items">
              {this.fetchLatestPosts(this.state.numLatest).map(post => (
                <PostLink
                  title={post.title}
                  date={post.date}
                  handleClick={e =>
                    this.handleLinkClick(e, post.position.x, post.position.y)
                  }
                />
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
                    <PostLink
                      title={post.title}
                      date={post.date}
                      handleClick={e => this.handleLinkClick(e, x, y)}
                    />
                  ))}
                </Accordion>
              ))}
            </div>
          </div>
        </div>
        <div id={visible} className="blog-hero" onClick={this.handleHeroClick}>
          <div className="blog-hero-content">
            <img src={this.state.current.thumbnail} />
            <h1>{this.state.current.title}</h1>
            <h4>{this.state.category}</h4>
            <small>{this.state.current.date}</small>
            <RectangleButton
              id="post-open"
              icon={<Book />}
              text="R E A D"
              handleClick={this.handleReadClick}
            />
          </div>
        </div>
        <div id={visible} className="blog-post">
          {this.state.postOpen ? (
            <SquareButton
              id="post-close"
              icon={<FormNext />}
              handleClick={this.togglePost}
            />
          ) : (
            ""
          )}
          <div className="blog-post-content">
            {this.state.current.content.map(section => (
              <div className="blog-post-content-section">
                <div className="blog-post-content-section-heading">
                  <h3>{section.heading}</h3>
                </div>
                <div className="blog-post-content-section-text">
                  <p>{section.text}</p>
                </div>
                <Slider id="image-slider">
                  {section.images.map(image => (
                    <div className="slider-image">
                      <img src={image.src} />
                      <div className="slider-image-caption">
                        {image.caption}
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const PostLink = props => (
  <div id={props.id} className="blog-link" onClick={props.handleClick}>
    <p>{props.title}</p>
    <small>{props.date}</small>
  </div>
);
