import React from "react";
import { Link } from "react-router-dom";
import { Close, FacebookOption, Twitter } from "grommet-icons";
import { MenuContext } from "../App.js";
import { SquareButton, PanelButton } from "./Buttons.js";
import "../stylesheets/Menu.css";

const MenuConfig = [
  [{ text: "home", link: "/central" }, { text: "about", link: "/central" }],
  [{ text: "blog", link: "/central/blog" }, { text: "projects", link: "/central" }],
  [{ text: "contact", link: "/central"}]
];

export const MenuPanel = props => (
  <div id={props.id} className="menu-panel">
    <TopRibbon />
    <MenuSections />
    <ShareRibbon />
  </div>
);

const TopRibbon = () => (
  <div className="menu-panel-header">
    <MenuContext.Consumer>
      {context => (
        <SquareButton
          id="close-menu"
          icon={<Close />}
          handleClick={context.toggleMenu}
        />
      )}
    </MenuContext.Consumer>
  </div>
);

const MenuSections = () => {
  return (
    <div className="menu-panel-content">
      {MenuConfig.map(section => (
        <div className="menu-panel-content-section">
          {section.map(item => (
            <MenuItem text={item.text} link={item.link} />
          ))}
        </div>
      ))}
    </div>
  );
};

const MenuItem = props => (
  <Link to={props.link}>
    <MenuContext.Consumer>
      {context => (
        <PanelButton
          id="menu-item"
          text={props.text}
          handleClick={context.toggleMenu}
        />
      )}
    </MenuContext.Consumer>
  </Link>
);

const ShareRibbon = () => (
  <div className="menu-panel-share-ribbon">
    <SquareButton icon={<FacebookOption />} />
    <SquareButton icon={<Twitter />} />
  </div>
);
