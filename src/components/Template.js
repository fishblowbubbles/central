import React from "react";
import "../stylesheets/Template.css";

export const Template = props => (
  <div id={props.menuOpen ? "show" : "hide"} className="template">
    {props.children}
  </div>
);
