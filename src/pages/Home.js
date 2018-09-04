import React, { Component } from "react";
import { Hero } from "../components/Hero.js";
import { MontyHall } from "../components/MontyHall.js";

export class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <Hero>
          <MontyHall />
        </Hero>
      </div>
    );
  }
}
