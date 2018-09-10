import React from "react";
import "../stylesheets/Buttons.css";

export const SquareButton = props => (
  <div id={props.id} className="btn btn-square" onClick={props.handleClick}>
    {props.icon}
  </div>
);

export const PanelButton = props => (
  <div id={props.id} className="btn btn-panel" onClick={props.handleClick}>
    {props.text}
  </div>
);

export const RectangleButton = props => (
  <div id={props.id} className="btn btn-rectangle" onClick={props.handleClick}>
    <SquareButton icon={props.icon} />
    <PanelButton text={props.text} />
  </div>
);
