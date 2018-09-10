import React from "react";
import { Paint } from "grommet-icons";
import "../stylesheets/Error.css";

const Construction = () => (
  <div className="under-construction">
    <Paint id="paint-bucket" />
    Sorry, this page isn't ready yet.
    <br />
    Try again next time!
  </div>
);

export { Construction };
