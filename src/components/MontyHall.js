import React, { Component } from "react";
import { Diamond, Gift, Gremlin, Refresh, Secure, Shift } from "grommet-icons";
import { RectangleButton } from "./Buttons.js";
import { Slider, SliderItem } from "./Slider.js";
import "../stylesheets/MontyHall.css";

export class MontyHall extends Component {
  selection = -1;
  doors = [0, 0, 0];
  stickWin = 0;
  switchWin = 0;
  stickLosses = 0;
  switchLosses = 0;

  state = {
    stage: 0
  };

  componentDidMount() {
    this.setPrizePosition();
  }

  handleSelectClick = index => {
    this.selection = index;
    this.openWrongDoor();
    this.setState({
      stage: this.state.stage + 1
    });
  };

  handleStickClick = e => {
    this.checkWin("stick");
  };

  handleSwitchClick = e => {
    this.selection = this.switchPlayerSelection();
    this.checkWin("switch");
  };

  handleResetClick = e => {
    this.doors = [0, 0, 0];
    this.selection = -1;
    this.setPrizePosition();
    this.setState({
      stage: 0
    });
  };

  updateScoreboard = (stickWin, switchWin, stickLoss, switchLoss) => {
    this.stickWin += stickWin;
    this.switchWin += switchWin;
    this.stickLosses += stickLoss;
    this.switchLosses += switchLoss;
  };

  randomRange = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  setPrizePosition = () => {
    let prizePosition = this.randomRange(0, this.doors.length);
    this.doors[prizePosition] = 1;
  };

  openWrongDoor = () => {
    let zeroPositions = this.getZeroPositions();
    let hostSelection = this.randomRange(0, zeroPositions.length);
    let toOpen = zeroPositions[hostSelection];
    this.doors[toOpen] = -1;
  };

  getZeroPositions = () => {
    let zeroPositions = [];
    this.doors.forEach((item, index) => {
      if (item === 0 && index !== this.selection) {
        zeroPositions.push(index);
      }
    });
    return zeroPositions;
  };

  switchPlayerSelection = () => {
    for (let i = 0; i < this.doors.length; i++) {
      if (this.doors[i] !== -1 && i !== this.selection) {
        return i;
      }
    }
  };

  getDoorButtons = () => {
    return this.doors.map((status, index) => {
      let icon = <Gift />;
      if (this.state.stage === 2) {
        if (status === 0) {
          icon = <Gremlin />;
        } else if (status === 1) {
          icon = <Diamond />;
        }
      }

      if (status === -1) {
        icon = <Gremlin />;
      }

      return (
        <DoorButton
          id={index === this.selection ? "highlight" : ""}
          icon={icon}
          stage={this.state.stage}
          handleClick={() => this.handleSelectClick(index)}
          disabled={this.state.stage !== 0}
        />
      );
    });
  };

  getCurrentInstruction = () => {
    if (this.state.stage === 0) {
      return <Instruction text="Select a gift!" />;
    } else if (this.state.stage === 1) {
      return (
        <StickSwitch
          handleStickClick={this.handleStickClick}
          handleSwitchClick={this.handleSwitchClick}
        />
      );
    } else if (this.state.stage === 2) {
      const playAgain = (
        <RectangleButton
          id="play-again-button"
          icon={<Refresh />}
          text="P L A Y    A G A I N"
          handleClick={this.handleResetClick}
        />
      );
      return (
        <React.Fragment>
          {this.doors[this.selection] === 1 ? (
            <Instruction text="Nice job!">{playAgain}</Instruction>
          ) : (
            <Instruction text="Ugh, gremlin!">{playAgain}</Instruction>
          )}
        </React.Fragment>
      );
    }
  };

  checkWin = choice => {
    if (this.doors[this.selection] === 1) {
      if (choice === "stick") {
        this.updateScoreboard(1, 0, 0, 0);
      } else if (choice === "switch") {
        this.updateScoreboard(0, 1, 0, 0);
      }
    } else {
      if (choice === "stick") {
        this.updateScoreboard(0, 0, 1, 0);
      } else if (choice === "switch") {
        this.updateScoreboard(0, 0, 0, 1);
      }
    }

    this.setState({
      stage: this.state.stage + 1
    });
  };

  render() {
    console.log(`Doors: ${this.doors}`);
    console.log(`Selection: ${this.selection}`);
    console.log(`Stage: ${this.state.stage}`);

    return (
      <div className="monty-hall">
        <div className="monty-hall-heading">Monty Hall Simulator</div>
        <Slider id="monty-hall-slider">
          <SliderItem>
            <div className="monty-hall-slider-description">
              <h2>The Problem</h2>
              <br />
              <p>
                Suppose you're on a game show, and you're given the choice of
                three gifts: inside one is a diamond; behind the others,
                gremlins.
                <br />
                <br />
                You pick a gift, say No. 1, and the host, who knows what's
                inside the gifts, opens another gift, say No. 3, which has a
                gremlin.
                <br />
                <br />
                He then says to you, ‘Do you want to pick gift No. 2 instead?’
                Is it to your advantage to switch your choice?
              </p>
            </div>
          </SliderItem>
          <SliderItem />
          <SliderItem />
        </Slider>
        <div className="monty-hall-interactive">
          <div className="monty-hall-scoreboard">
            <Scoreboard
              stickWin={this.stickWin}
              switchWin={this.switchWin}
              stickLosses={this.stickLosses}
              switchLosses={this.switchLosses}
            />
          </div>
          <div className="monty-hall-interactive-gifts">
            {this.getDoorButtons()}
          </div>
          <div className="monty-hall-interactive-instructions">
            {this.getCurrentInstruction()}
          </div>
        </div>
      </div>
    );
  }
}

const Scoreboard = props => (
  <div className="scoreboard">
    <div className="scoreboard-heading">Scoreboard</div>
    <table className="scoreboard-table">
      <thead>
        <tr>
          <th />
          <th>Stick</th>
          <th>Switch</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Wins</th>
          <td>{props.stickWin}</td>
          <td>{props.switchWin}</td>
        </tr>
        <tr>
          <th>Losses</th>
          <td>{props.stickLosses}</td>
          <td>{props.switchLosses}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const DoorButton = props => (
  <button
    id={props.id}
    className="door-button"
    onClick={props.handleClick}
    disabled={props.disabled}
  >
    {props.icon}
  </button>
);

const Instruction = props => (
  <React.Fragment>
    <div id="instruction-text">{props.text}</div>
    {props.children}
  </React.Fragment>
);

const StickSwitch = props => (
  <React.Fragment>
    <RectangleButton
      id="stick-switch-button"
      icon={<Secure />}
      text="S T I C K"
      handleClick={props.handleStickClick}
    />
    <RectangleButton
      id="stick-switch-button"
      icon={<Shift />}
      text="S W I T C H"
      handleClick={props.handleSwitchClick}
    />
  </React.Fragment>
);
