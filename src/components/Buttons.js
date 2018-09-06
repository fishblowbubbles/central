import React from "react";
import "../stylesheets/Buttons.css";

export const SquareButton = props => (
  <div
    {...props}
    className="square-button button-defaults"
    onClick={props.handleClick}
  >
    {props.icon}
  </div>
);

export const PanelButton = props => (
  <div
    {...props}
    className="panel-button button-defaults"
    onClick={props.handleClick}
  >
    {props.text}
  </div>
);

export const RectangleButton = props => (
  <div {...props} className="rectangle-button button-defaults" onClick={props.handleClick}>
    <SquareButton icon={props.icon} />
    <PanelButton text={props.text} />
  </div>
);
