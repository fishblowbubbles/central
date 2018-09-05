import React, { Component } from "react";
import { MontyHall } from "../components/MontyHall.js";
import "../stylesheets/Home.css";

export class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <div className="left-subpanel" />
        <div className="right-subpanel">
          <MontyHall />
        </div>
      </div>
    );
  }
}
