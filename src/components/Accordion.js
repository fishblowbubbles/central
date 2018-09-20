import React, { Component } from "react";
import { PanelButton } from "./Buttons.js";
import "../stylesheets/Accordion.less";

export class Accordion extends Component {
  state = {
    sectionOpen: false
  };

  componentDidMount() {
    if (this.props.startState === "open") this.togglePanel();
  }

  togglePanel = () => {
    this.setState({
      sectionOpen: !this.state.sectionOpen
    });
  };

  render() {
    const visible = this.state.sectionOpen ? "show" : "hide";
    return (
      <div id={this.props.id} className="accordion">
        <div className="accordion-heading" onClick={this.togglePanel}>
          {this.props.heading}
        </div>
        <div id={visible} className="accordion-section">
          {this.props.children}
        </div>
      </div>
    );
  }
}
