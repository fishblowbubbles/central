import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Menu } from "grommet-icons";
import { Panel } from "./components/Panel.js";
import { SquareButton } from "./components/Buttons.js";
import { Home } from "./pages/Home.js";
import { About } from "./pages/About.js";
import { Blog } from "./pages/Blog.js";
import { Projects } from "./pages/Projects.js";
import { Contact } from "./pages/Contact.js";
import "./stylesheets/App.less";

export default class App extends Component {
  state = {
    panelOpen: false
  };

  handleContentClick = e => {
    if (this.state.panelOpen) this.togglePanel();
  };

  togglePanel = () => {
    this.setState({
      panelOpen: !this.state.panelOpen
    });
  };

  render() {
    const visible = this.state.panelOpen ? "show" : "hide";
    return (
      <div className="app">
        <SquareButton
          id="panel-open"
          icon={<Menu />}
          handleClick={this.togglePanel}
        />
        <Panel
          id={visible}
          config={NavigationConfig}
          handleClick={this.togglePanel}
        />
        <div
          id={visible}
          className="app-content"
          onClick={this.handleContentClick}
        >
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

export const NavigationConfig = [
  [
    { text: "H O M E", link: "/central" },
    { text: "A B O U T", link: "/central/about" }
  ],
  [
    { text: "B L O G", link: "/central/blog" },
    { text: "P R O J E C T S", link: "/central/projects" }
  ],
  [{ text: "C O N T A C T", link: "/central/contact" }],
  [{ text: "C R E D I T S", link: "/central/credits" }]
];
