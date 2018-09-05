import React, { Component } from "react";
import { Diamond, Gift, Gremlin, Shift, Secure, Tooltip } from "grommet-icons";
import { RectangleButton, SquareButton } from "./Buttons.js";
import { Slider, SliderItem } from "./Slider.js";
import "../stylesheets/MontyHall.css";

export class MontyHall extends Component {
  state = {
    selection: 0,
    doors: [0, 2, -1],
    stage: 1
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
    this.state.doors.forEach((item, index) => {
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

  getDoorButtons = () => {
    return this.state.doors.map(status => {
      if (status === -1) {
        return <DoorButton icon={<Gremlin />} stage={this.state.stage} />;
      } else if (status === 2) {
        return <DoorButton icon={<Diamond />} stage={this.state.stage} />;
      } else {
        return <DoorButton icon={<Gift />} stage={this.state.stage} />;
      }
    });
  };

  getCurrentInstruction = () => {
    if (this.state.stage === 0) {
      // prompt user to select a door
      return (
        <div className="tooltip-container">
          <Tooltip id="tooltip-icon" />
          <div id="tooltip-text">S E L E C T A G I F T</div>
        </div>
      );
    } else if (this.state.stage === 1) {
      // display stick or switch buttons
      return <StickSwitch handleSwitchClick={this.switchPlayerSelection} />;
    } else if (this.state.stage === 2) {
      if (this.state.doors[this.state.selection] === 1) {
        // user has guessed correctly
      } else {
        // user has guessed wrongly
      }
      // display try again button, update scoreboard
    }
  };

  render() {
    return (
      <div className="monty-hall-container">
        <div className="monty-hall-heading">Monty Hall Simulator</div>
        <div className="scoreboard-container">
          <Slider>
            <SliderItem>
              <div className="scoreboard-description">
                Suppose you're on a game show, and you're given the choice of
                three gifts: inside one gift is a diamond; behind the others,
                gremlins.
                <br />
                <br />
                You pick a gift, say No. 1, and the host, who knows what's
                inside the gifts, opens another gift, say No. 3, which has a
                gremlin.
                <br />
                <br />
                He then says to you, "Do you want to pick gift No. 2 instead?"
                Is it to your advantage to switch your choice?
              </div>
            </SliderItem>
            <SliderItem />
          </Slider>
        </div>
        <div className="interactive-container">
          <div className="doors-container">{this.getDoorButtons()}</div>
          <div className="instructions-container">
            {this.getCurrentInstruction()}
          </div>
        </div>
      </div>
    );
  }
}

const DoorButton = props => <SquareButton id="door-button" icon={props.icon} />;

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
