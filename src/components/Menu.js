import React from "react";
import { Link } from "react-router-dom";
import { Close, FacebookOption, Instagram, Twitter } from "grommet-icons";
import { SquareButton, PanelButton } from "./Buttons.js";
import "../stylesheets/Menu.css";

export const MenuPanel = props => (
  <div id={props.id} className="menu-panel">
    <div className="menu-panel-header">
      <SquareButton
        id="menu-close"
        icon={<Close />}
        handleClick={props.handleClick}
      />
    </div>
    <div className="menu-panel-navigation">
      {props.config.map(section => (
        <div className="menu-panel-navigation-section">
          {section.map(item => (
            <Link to={item.link}>
              <PanelButton
                id="menu-link"
                className="menu-panel-navigation-item"
                text={item.text}
                handleClick={props.handleClick}
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
