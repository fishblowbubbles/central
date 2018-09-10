import React from "react";
import { Link } from "react-router-dom";
import { Close, FacebookOption, Instagram, Twitter } from "grommet-icons";
import { MenuContext } from "../App.js";
import { SquareButton, PanelButton } from "./Buttons.js";
import "../stylesheets/Menu.css";

const MenuPanel = props => (
  <div id={props.id} className="menu-panel">
    <div className="menu-panel-header">
      <SquareButton
        id="menu-close"
        icon={<Close />}
        handleClick={props.toggleMenu}
      />
    </div>
    <div className="menu-panel-navigation">
      {props.config.map(section => (
        <div className="menu-panel-navigation-section">
          {section.map(item => (
            <Link to={item.link}>
              <PanelButton
                className="menu-panel-navigation-item"
                text={props.text}
                handleClick={props.toggleMenu}
              />
            </Link>
          ))}
        </div>
      ))}
    </div>
    <div className="menu-panel-social">
      <SquareButton icon={<FacebookOption />} />
      <SquareButton icon={<Twitter />} />
      <SquareButton icon={<Instagram />} />
    </div>
  </div>
);

export { MenuPanel };