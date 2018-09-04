import React from "react";
import { Paint } from "grommet-icons";
import "../stylesheets/Error.css";

export const Construction = () => (
  <div id="under-construction">
    <Paint id="paint-bucket" color="#333333" />
    <div>
      Sorry, this page isn't ready yet.
      <br />
      Try again next time!
    </div>
  </div>
);
