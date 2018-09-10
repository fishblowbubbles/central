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

const MenuConfig = [
  [
    { text: "Home", link: "/central" },
    { text: "About", link: "/central/about" }
  ],
  [
    { text: "Blog", link: "/central/blog" },
    { text: "Projects", link: "/central/projects" }
  ],
  [{ text: "Contact", link: "/central/contact" }]
];

class App extends Component {
  state = {
    menuOpen: false
  };

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
        />
        <MenuPanel
          id={this.state.menuOpen ? "show" : "hide"}
          config={MenuConfig}
          handleClick={this.toggleMenu}
        />
        <div id={this.state.menuOpen ? "show" : "hide"} className="app-content">
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

export default App;
