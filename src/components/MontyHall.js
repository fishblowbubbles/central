import React, { Component } from "react";
import {
  Diamond,
  Down,
  Gremlin,
  Help,
  Refresh,
  Secure,
  Shift,
  Up
} from "grommet-icons";
import { RectangleButton, SquareButton } from "./Buttons.js";
import { Slider } from "./Slider.js";
import "../stylesheets/MontyHall.less";

export class MontyHall extends Component {
  score = [[0, 0], [0, 0]];
  numDoors = 3;
  // 0 = gremlin; -1 = opened, gremlin; 1 = diamond
  doorValues = [];
  // -1 = no selection; index otherwise
  selection;

  state = {
    stage: 0
  };

  componentDidMount() {
    this.reset();
  }

  handleDoorClick = (e, index) => {
    this.selection = index;
    this.openGremlinDoors();
    this.setState({
      stage: this.state.stage + 1
    });
  };

  handleStickClick = e => {
    this.updateScore("stick");
  };

  handleSwitchClick = e => {
    this.selection = this.switchPlayerSelection();
    this.updateScore("switch");
  };

  handlePlayAgainClick = e => {
    this.reset();
  };

  handleAddDoorClick = e => {
    this.numDoors += 1;
    this.reset();
  };

  handleReduceDoorClick = e => {
    this.numDoors -= 1;
    this.reset();
  };

  reset = () => {
    this.doorValues = [];
    for (let i = 0; i < this.numDoors; i++) this.doorValues.push(0);

    // pick a random door, and assign the diamond to it
    let prizePosition = this.randomRange(0, this.doorValues.length);
    this.doorValues[prizePosition] = 1;

    this.selection = -1;
    this.setState({
      stage: 0
    });
  };

  /**
   * From the unselected doors, reveal all but one door.
   */
  openGremlinDoors = () => {
    let gremlinsToReveal = this.getGremlinPositions();
    let selectionIndex = gremlinsToReveal.indexOf(this.selection);

    if (selectionIndex !== -1) {
      // exclude player's selection
      gremlinsToReveal.splice(selectionIndex, 1);
    } else {
      // keep a gremlin door closed
      let toLeave = this.randomRange(0, gremlinsToReveal.length);
      gremlinsToReveal.splice(toLeave, 1);
    }

    for (let i = 0; i < gremlinsToReveal.length; i++)
      this.doorValues[gremlinsToReveal[i]] = -1;
  };

  /**
   * Iterates through the doors list and extracts the
   * positions of those that contain a gremlin.
   */
  getGremlinPositions = () => {
    let gremlinPositions = [];
    for (let i = 0; i < this.doorValues.length; i++)
      if (this.doorValues[i] === 0) gremlinPositions.push(i);
    return gremlinPositions;
  };

  /**
   * Changes the player's selection to the unselected door
   * (there should only be one).
   */
  switchPlayerSelection = () => {
    for (let i = 0; i < this.doorValues.length; i++)
      if (this.doorValues[i] !== -1 && i !== this.selection) return i;
  };

  /**
   * Checks if the player has won the prize, and updates
   * the score according to the decision (stick or switch)
   * that was made.
   */
  updateScore = choice => {
    let i = this.doorValues[this.selection] === 1 ? 0 : 1;
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
    } else if (this.state.stage === 2) {
      // reveal doors
      if (value === 0) {
        icon = <Gremlin />;
      } else if (value === 1) {
        icon = <Diamond />;
      }
    }
    return icon;
  };

  displayCurrentInstruction = () => {
    if (this.state.stage === 0) return <h2>{"PICK A DOOR"}</h2>;
    if (this.state.stage === 1)
      return (
        <React.Fragment>
          <RectangleButton
            id="instruction-select"
            icon={<Secure />}
            text="S T I C K"
            handleClick={this.handleStickClick}
          />
          <RectangleButton
            id="instruction-select"
            icon={<Shift />}
            text="S W I T C H"
            handleClick={this.handleSwitchClick}
          />
        </React.Fragment>
      );
    if (this.state.stage === 2)
      return (
        <React.Fragment>
          <h2>
            {this.doorValues[this.selection] === 1
              ? "WELL DONE!"
              : "UGH, GREMLIN!"}
          </h2>
          <RectangleButton
            id="instruction-select"
            icon={<Refresh />}
            text="P L A Y    A G A I N"
            handleClick={this.handlePlayAgainClick}
          />
        </React.Fragment>
      );
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
                  {this.score[0].map(count => (
                    <td>{count}</td>
                  ))}
                </tr>
                <tr>
                  <th>L O S S E S</th>
                  {this.score[1].map(count => (
                    <td>{count}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="montyhall-interactive-stage">
            <div className="montyhall-interactive-stage-doors">
              {this.doorValues.map((value, index) => (
                <button
                  id={index === this.selection ? "highlight" : ""}
                  className="door-select"
                  onClick={e => this.handleDoorClick(e, index)}
                  disabled={this.state.stage !== 0}
                >
                  {this.whichIcon(value)}
                </button>
              ))}
            </div>
            <div className="montyhall-interactive-stage-controls">
              {this.numDoors < 6 ? (
                <SquareButton
                  id="control-add"
                  icon={<Up />}
                  handleClick={this.handleAddDoorClick}
                />
              ) : (
                ""
              )}
              <h3>{this.numDoors}</h3>
              {this.numDoors > 3 ? (
                <SquareButton
                  id="control-reduce"
                  icon={<Down />}
                  handleClick={this.handleReduceDoorClick}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="montyhall-interactive-instructions">
            {this.displayCurrentInstruction()}
          </div>
        </div>
      </div>
    );
  }
}

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
      "Switching doubles your chance of winning. The host is the difference maker here - it (in this case, the computer) knows where the prize is, and your initial choice determines which door it reveals to you, providing valuable information as to where the prize is located.",
      "More specifically, the door that you choose at the start has a 1/3 chance of containing the diamond; the other 2 doors will have a combined chance of 2/3.",
      "However, once the host opens a door with the gremlin, its probability is now 0, but the combined probability does not change. The remaining door, which you did not choose, now has a probability of 2/3!",
      "When there are more doors, the same applies - for 4 doors, switching will give you a probability of 3/4, and for 5 doors, it is 4/5, and so on."
    ]
  }
];
