import React, { Component } from "react";
import { Next, Previous, Radial, RadialSelected } from "grommet-icons";
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
      return this.state.position === i ? item : "";
    });

  displayPreviousArrow = () =>
    this.state.position > 0 ? (
      <SquareButton
        id="prev-arrow"
        icon={<Previous />}
        handleClick={this.handlePrevClick}
      />
    ) : (
      ""
    );

  displayNextArrow = () =>
    this.state.position + 1 < this.length ? (
      <SquareButton
        id="next-arrow"
        icon={<Next />}
        handleClick={this.handleNextClick}
      />
    ) : (
      ""
    );

  displayCurrentIndex = () => {
    let pages = [];
    for (let i = 0; i < this.length; i++) {
      if (i === this.state.position) {
        pages.push(1);
      } else {
        pages.push(0);
      }
    }

    return pages.map(
      status =>
        status === 1 ? (
          <RadialSelected id="radial-icon" />
        ) : (
          <Radial id="radial-icon" />
        )
    );
  };

  render() {
    return (
      <div id={this.props.id} className="slider">
        {this.getCurrentItem()}
        <div className="slider-navigation">
          {this.displayPreviousArrow()}
          <div className="slider-navigation-index">
            {this.displayCurrentIndex()}
          </div>
          {this.displayNextArrow()}
        </div>
      </div>
    );
  }
}

export const SliderItem = props => (
  <div {...props} className="slider-item">
    {props.children}
  </div>
);
