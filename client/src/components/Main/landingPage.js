import React, { Component } from "react";
import * as actions from "../../actions/index";
import { connect } from "react-redux";

class LandingPage extends Component {
  render() {
    return <div>This is LandingPage</div>;
  }
}

export default connect()(LandingPage);
