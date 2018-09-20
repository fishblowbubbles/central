import React from "react";
import "../stylesheets/Background.less";

export const Background = props => (
  <div
    id={props.id}
    className="background"
    style={{ backgroundImage: "url(" + props.src + ")" }}
  />
);
