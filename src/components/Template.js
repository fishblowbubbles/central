import React from "react";
import { MenuContext } from "../App.js";
import "../stylesheets/Template.css";

export const Template = props => (
  <MenuContext.Consumer>
    {context => (
      <div id={context.state.menuOpen ? "show" : "hide"} className="template">
        {props.children}
      </div>
    )}
  </MenuContext.Consumer>
);
