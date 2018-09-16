import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Menu } from "grommet-icons";
import { MenuPanel } from "./components/Menu.js";
import { SquareButton } from "./components/Buttons.js";
import { Home } from "./pages/Home.js";
import { About } from "./pages/About.js";
import { Blog } from "./pages/Blog.js";
import { Projects } from "./pages/Projects.js";
import { Contact } from "./pages/Contact.js";
import "./stylesheets/App.css";

export default class App extends Component {
  state = {
    menuOpen: false
  };

  handleContentClick = e => {
    if (this.state.menuOpen) {
      e.stopPropagation();
      this.toggleMenu();
    }
  }

  toggleMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  };

  render() {
    return (
      <div className="app">
        <SquareButton
          id="menu-open"
          icon={<Menu />}
          handleClick={this.toggleMenu}
        />
        <MenuPanel
          id={this.state.menuOpen ? "show" : "hide"}
          config={MenuConfig}
          handleClick={this.toggleMenu}
        />
        <div id={this.state.menuOpen ? "show" : "hide"} className="app-content" onClick={this.handleContentClick}>
          <Switch>
            <Route exact path="/central" component={Home} />
            <Route exact path="/central/about" component={About} />
            <Route exact path="/central/blog" component={Blog} />
            <Route exact path="/central/projects" component={Projects} />
            <Route exact path="/central/contact" component={Contact} />
          </Switch>
        </div>
      </div>
    );
  }
}

const MenuConfig = [
  [
    { text: "H O M E", link: "/central" },
    { text: "A B O U T", link: "/central/about" }
  ],
  [
    { text: "B L O G", link: "/central/blog" },
    { text: "P R O J E C T S", link: "/central/projects" }
  ],
  [{ text: "C O N T A C T", link: "/central/contact" }]
];