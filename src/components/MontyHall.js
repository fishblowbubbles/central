import React, { Component } from "react";
import { Diamond, Gremlin, Help, Refresh, Secure, Shift } from "grommet-icons";
import { RectangleButton } from "./Buttons.js";
import { Slider } from "./Slider.js";
import "../stylesheets/MontyHall.css";

export class MontyHall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0
    };
    this.score = [[0, 0], [0, 0]];
    this.doors = [0, 0, 0];
    this.selection = -1;
  }

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
    this.selection = this.switchPlayerSelection();
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

  randomRange = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  setPrizePosition = () => {
    let prizePosition = this.randomRange(0, this.doors.length);
    this.doors[prizePosition] = 1;
  };

  openGremlinDoor = () => {
    let gremlinPositions = this.getGremlinPositions();
    let hostSelection = this.randomRange(0, gremlinPositions.length);
    let toOpen = gremlinPositions[hostSelection];
    this.doors[toOpen] = -1;
  };

  switchPlayerSelection = () => {
    for (let i = 0; i < this.doors.length; i++) {
      if (this.doors[i] !== -1 && i !== this.selection) {
        return i;
      }
    }
  };

  updateScore = choice => {
    let i = this.doors[this.selection] === 1 ? 0 : 1;
    let j = choice === "stick" ? 0 : 1;
    this.score[i][j] += 1;
    this.setState({
      stage: this.state.stage + 1
    });
  };

  getGremlinPositions = () => {
    let gremlinPositions = [];
    for (let i = 0; i < this.doors.length; i++) {
      if (this.doors[i] === 0 && i !== this.selection) {
        gremlinPositions.push(i);
      }
    }
    return gremlinPositions;
  };

  getDoorIcon = value => {
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

  displayDoorButtons = () => {
    return this.doors.map((value, index) => (
      <DoorButton
        id={index === this.selection ? "highlight" : ""}
        icon={this.getDoorIcon(value)}
        stage={this.state.stage}
        handleClick={() => this.handleSelectClick(index)}
        disabled={this.state.stage !== 0}
      />
    ));
  };

  displayCurrentInstruction = () => {
    if (this.state.stage === 0) {
      return <Instruction text="P I C K    A    G I F T  !" />;
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
            <Instruction text="W E L L    D O N E !">
              <PlayAgain handleClick={this.handlePlayAgainClick} />
            </Instruction>
          ) : (
            <Instruction text="U G H ,    G R E M L I N !">
              <PlayAgain handleClick={this.handlePlayAgainClick} />
            </Instruction>
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
            <h2>T H E P R O B L E M</h2>
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
            <h2>T H E E X P E R I M E N T</h2>
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
          <div className="monty-hall-slider-description">
            <h2>T H E S O L U T I O N</h2>
            <br />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus,
              tempora blanditiis esse explicabo dolores eum facere harum
              pariatur officiis sint officia saepe tempore corporis.
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
  <React.Fragment>
    <div id="instruction-text">
      <h2>{props.text}</h2>
    </div>
    {props.children}
  </React.Fragment>
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
