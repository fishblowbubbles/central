import React from "react";
import "../stylesheets/Buttons.css";

const SquareButton = props => (
  <div id={props.id} className="btn btn-square" onClick={props.handleClick}>
    {props.icon}
  </div>
);

const PanelButton = props => (
  <div id={props.id} className="btn btn-panel" onClick={props.handleClick}>
    {props.text}
  </div>
);

const RectangleButton = props => (
  <div id={props.id} className="btn btn-rectangle" onClick={props.handleClick}>
    <SquareButton icon={props.icon} />
    <PanelButton text={props.text} />
  </div>
);

export { SquareButton, PanelButton, RectangleButton };
