import React, { Component } from "react";
import { Construction } from "../components/Error.js";
import { Template } from "../components/Template.js";

export class Projects extends Component {
  render() {
    return (
      <Template>
        <div className="blog-container">
          <Construction />
        </div>
      </Template>
    );
  }
}