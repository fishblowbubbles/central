import React, { Component } from "react";
import { Next, Previous, Radial, RadialSelected } from "grommet-icons";
import { SquareButton } from "./Buttons.js";
import "../stylesheets/Slider.less";

export class Slider extends Component {
  state = {
    position: 0
  };

  handleNextClick = e => {
    if (this.state.position + 1 < this.props.children.length)
      this.setState({
        position: this.state.position + 1
      });
  };

  handlePreviousClick = e => {
    if (this.state.position > 0)
      this.setState({
        position: this.state.position - 1
      });
  };

  displayNextArrow = () =>
    this.state.position + 1 < this.props.children.length ? (
      <SquareButton
        id="next-arrow"
        icon={<Next />}
        handleClick={this.handleNextClick}
      />
    ) : (
      ""
    );

  displayPreviousArrow = () =>
    this.state.position > 0 ? (
      <SquareButton
        id="prev-arrow"
        icon={<Previous />}
        handleClick={this.handlePreviousClick}
      />
    ) : (
      ""
    );

  displayNavigationIndicator = () =>
    React.Children.map(
      this.props.children,
      (item, index) =>
        index === this.state.position ? (
          <RadialSelected id="radial-icon" />
        ) : (
          <Radial id="radial-icon" />
        )
    );

  render() {
    return (
      <div id={this.props.id} className="slider">
        <div className="slider-content">
          {React.Children.map(this.props.children, (item, i) => {
            return this.state.position === i ? item : "";
          })}
        </div>
        <div className="slider-navigation">
          {this.displayPreviousArrow()}
          <div className="slider-navigation-indicator">
            {this.displayNavigationIndicator()}
          </div>
          {this.displayNextArrow()}
        </div>
      </div>
    );
  }
}
