import React, { Component } from "react";
import { Gift, Gremlin, Shift, Secure } from "grommet-icons";
import { RectangleButton, SquareButton } from "./Buttons.js";
import { Slider, SliderItem } from "./Slider.js";
import "../stylesheets/MontyHall.css";

export class MontyHall extends Component {
  state = {
    doors: [0, 0, 0],
    stage: 0
  };

  randomRange = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  setPrizePosition = doors => {
    let prizePosition = this.randomRange(0, doors.length);
    doors[prizePosition] = 1;

    return doors;
  };

  openWrongDoor = (doors, playerSelection) => {
    let zeroPositions = this.getZeroPositions(doors, playerSelection);
    let hostSelection = this.randomRange(0, zeroPositions.length);
    let toOpen = zeroPositions[hostSelection];
    doors[toOpen] = -1;

    return doors;
  };

  getZeroPositions = (doors, playerSelection) => {
    let zeroPositions = [];
    doors.forEach((item, index) => {
      if (item === 0 && index !== playerSelection) {
        zeroPositions.push(index);
      }
    });

    return zeroPositions;
  };

  switchPlayerSelection = (doors, playerSelection) => {
    let newSelection = playerSelection;
    doors.forEach((item, index) => {
      if (item !== -1 && index !== playerSelection) {
        newSelection = index;
      }
    });

    return newSelection;
  };

  render() {
    return (
      <div className="monty-hall-container">
        <div className="scoreboard-container">
          <div className="scoreboard-heading">Monty Hall Simulator</div>
          <Slider>
            <SliderItem>
              <div className="scoreboard-description">
                Suppose you're on a game show, and you're given the choice of three
                doors: behind one door is a car; behind the others, gremlins. You pick
                a door, say No. 1, and the host, who knows what's behind the doors,
                opens another door, say No. 3, which has a gremlin. He then says to
                you, "Do you want to pick door No. 2?" Is it to your advantage to
                switch your choice?
              </div>
            </SliderItem>
            <SliderItem>
            </SliderItem>
          </Slider>
        </div>
        <div className="interactive-container">
          <div className="doors-container">
            {this.state.doors.map(status => {
              return status === -1 ? (
                <SquareButton id="door-button" icon={<Gremlin />} />
              ) : (
                <SquareButton id="door-button" icon={<Gift />} />
              );
            })}
          </div>
          <StickSwitch handleSwitchClick={this.switchPlayerSelection} />
        </div>
      </div>
    );
  }
}

const StickSwitch = props => (
  <div className="stick-switch-container">
    <RectangleButton id="stick-button" icon={<Secure />} text="S T I C K" />
    <RectangleButton
      id="switch-button"
      icon={<Shift />}
      text="S W I T C H"
      handleClick={props.handleSwitchClick}
    />
  </div>
);
