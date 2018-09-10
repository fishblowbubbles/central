import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Github } from "grommet-icons";
import { RectangleButton } from "../components/Buttons.js";
import { MontyHall } from "../components/MontyHall.js";
import { Template } from "../components/Template.js";
import "../stylesheets/Home.css";

export class Home extends Component {
  render() {
    return (
      <Template menuOpen={this.props.menuOpen}>
        <div className="home-container">
          <div className="left-subpanel">
            <h1>visit the</h1>
            <Link id="blog-link" to="/central/blog">
              blog
            </Link>
            <h1>
              or check out this doo-dad
            </h1>
            <a href="https://github.com/fishblowbubbles/central" target="_blank">
              <RectangleButton
                id="github-button"
                icon={<Github />}
                text="S O U R C E    C O D E"
              />
            </a>
          </div>
          <div className="right-subpanel">
            <MontyHall />
          </div>
        </div>
      </Template>
    );
  }
}
