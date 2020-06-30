import React, { Fragment } from "react";
import spinner from "./../../images/Spinner.gif";

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: "50px", margin: "auto", display: "block" }}
      alt="Loading..."
    />
  </Fragment>
);
