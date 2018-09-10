import React, { Component } from "react";
import { Diamond, Gift, Gremlin, Refresh, Secure, Shift } from "grommet-icons";
import { RectangleButton } from "./Buttons.js";
import { Slider, SliderItem } from "./Slider.js";
import "../stylesheets/MontyHall.css";

export class MontyHall extends Component {
  selection = -1;
  doors = [0, 0, 0];
  stickWins = 0;
  switchWins = 0;
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
    this.switchPlayerSelection();
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

  switchPlayerSelection = () => {
    for (let i = 0; i < this.doors.length; i++) {
      if (this.doors[i] !== -1 && i !== this.selection) {
        this.selection = i;
        return;
      }
    }
  };

  checkWin = choice => {
    if (this.doors[this.selection] === 1) {
      if (choice === "stick") {
        this.stickWins += 1;
      } else if (choice === "switch") {
        this.switchWins += 1;
      }
    } else {
      if (choice === "stick") {
        this.stickLosses += 1;
      } else if (choice === "switch") {
        this.switchLosses += 1;
      }
    }

    this.setState({
      stage: this.state.stage + 1
    });
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

  displayDoorButtons = () => {
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

  displayCurrentInstruction = () => {
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

  render() {
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
          <SliderItem>
            <div className="monty-hall-slider-description">
              <h2>The Experiment</h2>
              <br />
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
                natus beatae saepe tenetur iste iusto laudantium architecto,
                maiores qui quisquam excepturi quidem placeat labore veniam. At
                blanditiis laborum excepturi adipisci.
                <br />
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, a.
                Ex perferendis temporibus, maxime at asperiores porro et tempora
                omnis fugit necessitatibus, inventore repellat autem.
              </p>
            </div>
          </SliderItem>
          <SliderItem>
            <div className="monty-hall-slider-description">
              <h2>The Solution</h2>
              <br />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Ducimus, tempora blanditiis esse explicabo dolores eum facere
                harum pariatur officiis sint officia saepe tempore corporis.
                <br />
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                ratione tenetur earum voluptate vitae deleniti nostrum.
                <br />
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In hic
                corporis illo laudantium laboriosam iusto quas dolore reiciendis
                dolorum consectetur delectus deserunt, modi molestiae! Id
                voluptates, laudantium eos nulla est cumque rem?
              </p>
            </div>
          </SliderItem>
        </Slider>
        <div className="monty-hall-interactive">
          <div className="monty-hall-interactive-scoreboard">
            <Scoreboard
              stickWins={this.stickWins}
              switchWins={this.switchWins}
              stickLosses={this.stickLosses}
              switchLosses={this.switchLosses}
            />
          </div>
          <div className="monty-hall-interactive-gifts">
            {this.displayDoorButtons()}
          </div>
          <div className="monty-hall-interactive-instructions">
            {this.displayCurrentInstruction()}
          </div>
        </div>
      </div>
    );
  }
}

const Scoreboard = props => (
  <div className="scoreboard">
    <div className="scoreboard-heading">
      <h2>Scoreboard</h2>
    </div>
    <table className="scoreboard-table">
      <thead>
        <tr>
          <th />
          <th>STICK</th>
          <th>SWITCH</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>WINS</th>
          <td>{props.stickWins}</td>
          <td>{props.switchWins}</td>
        </tr>
        <tr>
          <th>LOSSES</th>
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
