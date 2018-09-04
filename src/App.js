import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Menu } from "grommet-icons";
import { MenuPanel } from "./components/Menu.js";
import { SquareButton } from "./components/Buttons.js";
import { Home } from "./pages/Home.js";
import { Journal } from "./pages/Journal.js";
import "./stylesheets/App.css";

export const MenuContext = React.createContext();

export default class App extends Component {
  state = {
    menuOpen: false
  };

  toggleMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  };

  render() {
    const value = {
      state: this.state,
      toggleMenu: this.toggleMenu
    };

    return (
      <div className="app-container">
        <SquareButton
          id="open-menu"
          icon={<Menu />}
          handleClick={this.toggleMenu}
        />
        <MenuContext.Provider value={value}>
          <MenuPanel id={this.state.menuOpen ? "show" : "hide"} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/journal" component={Journal} />
          </Switch>
        </MenuContext.Provider>
      </div>
    );
  }
}
