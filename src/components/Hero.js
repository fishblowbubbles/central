import React from "react";
import "../stylesheets/Hero.css";

export const Hero = props => {
  const style = {
    backgroundImage: "url(" + props.background + ")"
  };

  return (
    <div id={props.id} className="hero" style={style}>
      {props.children}
    </div>
  );
};