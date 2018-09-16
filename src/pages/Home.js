import React from "react";
import { Link } from "react-router-dom";
import { Edit, Github } from "grommet-icons";
import { RectangleButton } from "../components/Buttons.js";
import { MontyHall } from "../components/MontyHall.js";
import "../stylesheets/Home.css";

export const Home = () => {
  return (
    <div className="home">
      <div className="home-hero">
        <Link id="blog-link" to="/central/blog">
          <RectangleButton
            id="blog-btn"
            icon={<Edit />}
            text="V I S I T    T H E    B L O G"
          />
        </Link>
        <div className="home-hero-text">
          O R    C H E C K    O U T<br />T H I S    D O O - D A D
        </div>
        <a href="https://github.com/fishblowbubbles/central" target="_blank">
          <RectangleButton
            id="github-btn"
            icon={<Github />}
            text="S O U R C E    C O D E"
          />
        </a>
      </div>
      <div className="home-doo-dad">
        <MontyHall />
      </div>
    </div>
  );
};
