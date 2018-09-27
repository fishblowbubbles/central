import React from "react";
import { Paint } from "grommet-icons";
import "../stylesheets/Error.less";

export const Construction = () => (
  <div className="under-construction">
    <Paint id="paint-bucket" />
    <h2>
      Sorry, this page isn't ready yet.
      <br />
      Come back next time!
    </h2>
  </div>
);
