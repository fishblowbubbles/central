import React, { Component } from "react";
import { Diamond, Gremlin, Help, Refresh, Secure, Shift } from "grommet-icons";
import { RectangleButton } from "./Buttons.js";
import { Slider } from "./Slider.js";
import "../stylesheets/MontyHall.css";

export class MontyHall extends Component {
  score = [[0, 0], [0, 0]];
  doors = [0, 0, 0];
  selection = -1;

  state = {
    stage: 0
  };

  componentDidMount() {
    this.setPrizePosition();
  }

  handleSelectClick = index => {
    this.selection = index;
    this.openGremlinDoor();
    this.setState({
      stage: this.state.stage + 1
    });
  };

  handleStickClick = e => {
    this.updateScore("stick");
  };

  handleSwitchClick = e => {
    this.switchPlayerSelection();
    this.updateScore("switch");
  };

  handlePlayAgainClick = e => {
    this.doors = [0, 0, 0];
    this.selection = -1;

    this.setPrizePosition();
    this.setState({
      stage: 0
    });
  };

  /**
   * Genereates a random integer between min (inclusive)
   * and max (exlusive).
   */
  randomRange = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  /**
   * Picks a random door, and assigns the prize to it.
   */
  setPrizePosition = () => {
    let prizePosition = this.randomRange(0, this.doors.length);
    this.doors[prizePosition] = 1;
  };

  /**
   * From the unselected doors, randomly choose one that
   * does not contain the prize.
   */
  openGremlinDoor = () => {
    let gremlinPositions = this.getGremlinPositions();
    let hostSelection = this.randomRange(0, gremlinPositions.length);
    let toOpen = gremlinPositions[hostSelection];
    this.doors[toOpen] = -1;
  };

  /**
   * Changes the player's selection to the unselected door
   * (there should only be one).
   */
  switchPlayerSelection = () => {
    for (let i = 0; i < this.doors.length; i++) {
      if (this.doors[i] !== -1 && i !== this.selection) {
        this.selection = i;
        return;
      }
    }
  };

  /**
   * Checks if the player has won the prize, and updates
   * the score according to the decision (stick or switch)
   * that was made.
   */
  updateScore = choice => {
    let i = this.doors[this.selection] === 1 ? 0 : 1;
    let j = choice === "stick" ? 0 : 1;

    this.score[i][j] += 1;
    this.setState({
      stage: this.state.stage + 1
    });
  };

  /**
   * Iterates through the doors list and extracts the
   * positions of those that contain a gremlin and is
   * not currently selected by the player
   */
  getGremlinPositions = () => {
    let gremlinPositions = [];
    for (let i = 0; i < this.doors.length; i++) {
      if (this.doors[i] === 0 && i !== this.selection) {
        gremlinPositions.push(i);
      }
    }
    return gremlinPositions;
  };

  whichIcon = value => {
    let icon = <Help />;
    if (value === -1) {
      icon = <Gremlin />;
    // reveal doors
    } else if (this.state.stage === 2) {
      if (value === 0) {
        icon = <Gremlin />;
      } else if (value === 1) {
        icon = <Diamond />;
      }
    }
    return icon;
  };

  displayDoorButtons = () => {
    return this.doors.map((value, index) => (
      <DoorButton
        id={index === this.selection ? "highlight" : ""}
        icon={this.whichIcon(value)}
        stage={this.state.stage}
        handleClick={() => this.handleSelectClick(index)}
        disabled={this.state.stage !== 0}
      />
    ));
  };

  displayCurrentInstruction = () => {
    if (this.state.stage === 0) {
      return <Instruction text="P I C K    A    D O O R" />;
    } else if (this.state.stage === 1) {
      return (
        <StickSwitch
          handleStickClick={this.handleStickClick}
          handleSwitchClick={this.handleSwitchClick}
        />
      );
    } else if (this.state.stage === 2) {
      return (
        <React.Fragment>
          {this.doors[this.selection] === 1 ? (
            <React.Fragment>
              <Instruction text="W E L L    D O N E  !" />
              <PlayAgain handleClick={this.handlePlayAgainClick} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Instruction text="U G H ,    G R E M L I N  !" />
              <PlayAgain handleClick={this.handlePlayAgainClick} />
            </React.Fragment>
          )}
        </React.Fragment>
      );
    }
  };

  render() {
    return (
      <div id={this.props.id} className="monty-hall">
        <div className="monty-hall-heading">Monty Hall Simulator</div>
        <Slider id="monty-hall-slider">
          <div className="monty-hall-slider-description">
            <h2>{"T H E    P R O B L E M"}</h2>
            <br />
            <p>
              Suppose you're on a game show, and you're given the choice of
              three doors: behind one is a diamond; behind the others, gremlins.
              <br />
              <br />
              You pick a door, say No. 1, and the host, who knows what's behind
              the doors, opens another door, say No. 3, which has a gremlin.
              <br />
              <br />
              He then says to you, ‘Do you want to pick door No. 2 instead?’ Is
              it to your advantage to switch your choice?
            </p>
          </div>
          <div className="monty-hall-slider-description">
            <h2>{"T H E    E X P E R I M E N T"}</h2>
            <br />
            <p>
              Play the game several times, alternating between sticking and
              switching. Look at the scoreboard - do you notice a trend?
              <br />
              <br />
              The greater the number of trials, the more obvious it will be.
              Also try increasing the number of doors - the math will reveal
              itself!
            </p>
          </div>
          <div className="monty-hall-slider-description">
            <h2>{"T H E    S O L U T I O N"}</h2>
            <br />
            <p>
              Switching doubles your chance of winning. The host is the
              difference maker here - it (in this case, the computer) knows
              where prize is, and your initial choice determines which door it
              reveals to you.
              <br />
              <br />
              Another explanation is this: at the start, the door that you pick
              has a 1/3 chance of containing the diamond; the other 2 doors will
              have a combined chance of 2/3.
              <br />
              <br />
              However, once the host opens a door with the gremlin, its
              probability is now 0, but the combined probability does not
              change. The remaining door, which you did not choose, now has a
              probability of 2/3 - thus, always switch!
            </p>
          </div>
        </Slider>
        <div className="monty-hall-interactive">
          <div className="monty-hall-interactive-scoreboard">
            <Scoreboard wins={this.score[0]} losses={this.score[1]} />
          </div>
          <div className="monty-hall-interactive-doors">
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
    <table className="scoreboard-table">
      <thead>
        <tr>
          <th />
          <th>S T I C K</th>
          <th>S W I T C H</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>W I N S</th>
          {props.wins.map(count => (
            <td>{count}</td>
          ))}
        </tr>
        <tr>
          <th>L O S S E S</th>
          {props.losses.map(count => (
            <td>{count}</td>
          ))}
        </tr>
      </tbody>
    </table>
  </div>
);

const DoorButton = props => (
  <button
    id={props.id}
    className="door-btn"
    onClick={props.handleClick}
    disabled={props.disabled}
  >
    {props.icon}
  </button>
);

const Instruction = props => (
  <div className="instruction">
    <h2>{props.text}</h2>
  </div>
);

const StickSwitch = props => (
  <React.Fragment>
    <RectangleButton
      id="stick-switch-btn"
      icon={<Secure />}
      text="S T I C K"
      handleClick={props.handleStickClick}
    />
    <RectangleButton
      id="stick-switch-btn"
      icon={<Shift />}
      text="S W I T C H"
      handleClick={props.handleSwitchClick}
    />
  </React.Fragment>
);

const PlayAgain = props => (
  <RectangleButton
    id="play-again-btn"
    icon={<Refresh />}
    text="P L A Y    A G A I N"
    handleClick={props.handleClick}
  />
);
