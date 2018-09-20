import React from "react";
import { Link } from "react-router-dom";
import { Close, FacebookOption, Instagram, Twitter } from "grommet-icons";
import { SquareButton, PanelButton } from "./Buttons.js";
import "../stylesheets/Panel.less";

export const Panel = props => (
  <div id={props.id} className="panel">
    <div className="panel-header">
      <SquareButton
        id="panel-close"
        icon={<Close />}
        handleClick={props.handleClick}
      />
    </div>
    <div className="panel-navigation">
      {props.config.map(section => (
        <div className="panel-navigation-section">
          {section.map(item => (
            <Link to={item.link}>
              <PanelButton
                id="panel-link"
                text={item.text}
                handleClick={props.handleClick}
              />
            </Link>
          ))}
        </div>
      ))}
    </div>
    <div className="panel-social">
      <SquareButton icon={<FacebookOption />} />
      <SquareButton icon={<Twitter />} />
      <SquareButton icon={<Instagram />} />
    </div>
  </div>
);
