import React from "react";
import "../stylesheets/Background.css";

export const Background = props => (
  <div
    id={props.id}
    className="background"
    style={{ backgroundImage: "url(" + props.src + ")" }}
  />
);
