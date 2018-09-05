import React from "react";
import "../stylesheets/Buttons.css";

export const SquareButton = props => (
  <div
    id={props.id}
    className="square-button button-defaults"
    onClick={props.handleClick}
  >
    {props.icon}
  </div>
);

export const PanelButton = props => (
  <div
    id={props.id}
    className="panel-button button-defaults"
    onClick={props.handleClick}
  >
    {props.text}
  </div>
);

export const RectangleButton = props => (
  <div id={props.id} className="rectangle-button button-defaults">
    <SquareButton icon={props.icon} handleClick={props.handleClick} />
    <PanelButton text={props.text} handleClick={props.handleClick}  />
  </div>
);
