import React, { Component } from "react";
import { Next, Previous } from "grommet-icons";
import { SquareButton } from "./Buttons.js";
import "../stylesheets/Slider.css";

export class Slider extends Component {
  length = this.props.children.length;
  state = {
    position: 0
  };

  handleNextClick = e => {
    const newPosition = this.state.position + 1;
    if (newPosition < this.length) {
      this.setState({
        position: newPosition
      });
    }
  };

  handlePrevClick = e => {
    if (this.state.position > 0) {
      this.setState({
        position: this.state.position - 1
      });
    }
  };

  getCurrentItem = () =>
    React.Children.map(this.props.children, (item, i) => {
      // if index matches position
      return this.state.position === i ? item : "";
    });

  render() {
    return (
      <div id={this.props.id} className="slider">
        {this.getCurrentItem()}
        {this.state.position > 0 ? (
          <SquareButton
            id="prev-arrow"
            icon={<Previous />}
            handleClick={this.handlePrevClick}
          />
        ) : (
          ""
        )}
        {this.state.position + 1 < this.length ? (
          <SquareButton
            id="next-arrow"
            icon={<Next />}
            handleClick={this.handleNextClick}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export const SliderItem = props => (
  <div id={props.id} className="slider-item">
    {props.children}
  </div>
);
