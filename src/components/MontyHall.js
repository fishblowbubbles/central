import React, { Component } from "react";
import { Diamond, Gremlin, Help, Refresh, Secure, Shift } from "grommet-icons";
import { RectangleButton } from "./Buttons.js";
import { Slider } from "./Slider.js";
import "../stylesheets/MontyHall.css";

export class MontyHall extends Component {
  score = [[0, 0], [0, 0]];
  doors = [0, 0, 0]; // 0 = gremlin; -1 = opened, gremlin; 1 = diamond
  selection = -1; // -1 = no selection; index otherwise

  state = {
    stage: 0
  };

  componentDidMount() {
    this.setPrizePosition();
  }

  handleDoorClick = (e, index) => {
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
   * Picks a random door, and assigns the prize to it.
   */
  setPrizePosition = () => {
    let prizePosition = this.randomRange(0, this.doors.length);
    this.doors[prizePosition] = 1;
  };

  /**
   * From the unselected doors, randomly choose and reveal
   * one that contains a gremlin.
   */
  openGremlinDoor = () => {
    let gremlinPositions = this.getGremlinPositions();
    let selectablePositions = [];

    for (let i = 0; i < gremlinPositions.length; i++) {
      if (gremlinPositions[i] !== this.selection)
        selectablePositions.push(gremlinPositions[i]);
    }

    let hostSelection = this.randomRange(0, selectablePositions.length);
    let toOpen = selectablePositions[hostSelection];
    this.doors[toOpen] = -1;
  };

  /**
   * Iterates through the doors list and extracts the
   * positions of those that contain a gremlin.
   */
  getGremlinPositions = () => {
    let gremlinPositions = [];
    for (let i = 0; i < this.doors.length; i++) {
      if (this.doors[i] === 0) gremlinPositions.push(i);
    }
    return gremlinPositions;
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
   * Genereates a random integer between min (inclusive)
   * and max (exlusive).
   */
  randomRange = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
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
        handleClick={e => this.handleDoorClick(e, index)}
        disabled={this.state.stage !== 0}
      />
    ));
  };

  displayCurrentInstruction = () => {
    if (this.state.stage === 0) return <h2>{"P I C K    A    D O O R"}</h2>;
    if (this.state.stage === 1)
      return (
        <React.Fragment>
          <RectangleButton
            id="montyhall-select"
            icon={<Secure />}
            text="S T I C K"
            handleClick={this.handleStickClick}
          />
          <RectangleButton
            id="montyhall-select"
            icon={<Shift />}
            text="S W I T C H"
            handleClick={this.handleSwitchClick}
          />
        </React.Fragment>
      );
    if (this.state.stage === 2) {
      return this.doors[this.selection] === 1 ? (
        <PlayAgain
          text="W E L L    D O N E  !"
          handleClick={this.handlePlayAgainClick}
        />
      ) : (
        <PlayAgain
          text="U G H ,    G R E M L I N  !"
          handleClick={this.handlePlayAgainClick}
        />
      );
    }
  };

  render() {
    return (
      <div id={this.props.id} className="montyhall">
        <div className="montyhall-heading">Monty Hall Simulator</div>
        <Slider id="montyhall-slider">
          {SliderContent.map(item => (
            <div className="montyhall-slider-description">
              <h2>{item.heading}</h2>
              {item.content.map(paragraph => (
                <p>
                  <br />
                  {paragraph}
                  <br />
                </p>
              ))}
            </div>
          ))}
        </Slider>
        <div className="montyhall-interactive">
          <Scoreboard wins={this.score[0]} losses={this.score[1]} />
          <div className="montyhall-interactive-doors">
            {this.displayDoorButtons()}
          </div>
          <div className="montyhall-interactive-instructions">
            {this.displayCurrentInstruction()}
          </div>
        </div>
      </div>
    );
  }
}

const Scoreboard = props => (
  <div className="montyhall-interactive-scoreboard">
    <table className="montyhall-interactive-scoreboard-table">
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
    className="btn btn-door"
    onClick={props.handleClick}
    disabled={props.disabled}
  >
    {props.icon}
  </button>
);

const PlayAgain = props => (
  <React.Fragment>
    <h2>{props.text}</h2>
    <RectangleButton
      id="montyhall-select"
      icon={<Refresh />}
      text="P L A Y    A G A I N"
      handleClick={props.handleClick}
    />
  </React.Fragment>
);

const SliderContent = [
  {
    heading: "T H E    P R O B L E M",
    content: [
      "Suppose you're on a game show, and you're given the choice of three doors: behind one is a diamond; behind the others, gremlins.",
      "You pick a door, say No. 1, and the host, who knows what's behind the doors, opens another door, say No. 3, which has a gremlin.",
      "He then says to you, ‘Do you want to pick door No. 2 instead?’ Is it to your advantage to switch your choice?"
    ]
  },
  {
    heading: "T H E    E X P E R I M E N T",
    content: [
      "Play the game several times, alternating between sticking and switching. Look at the scoreboard - do you notice a trend?",
      "The greater the number of trials, the more obvious it will be. Also try increasing the number of doors - the math will reveal itself!"
    ]
  },
  {
    heading: "T H E    S O L U T I O N",
    content: [
      "Switching doubles your chance of winning. The host is thedifference maker here - it (in this case, the computer) knows where prize is, and your initial choice determines which door it reveals to you.",
      "Another explanation is this: at the start, the door that you pick has a 1/3 chance of containing the diamond; the other 2 doors will have a combined chance of 2/3.",
      "However, once the host opens a door with the gremlin, itsprobability is now 0, but the combined probability does not change. The remaining door, which you did not choose, now has a probability of 2/3 - thus, always switch!"
    ]
  }
];
