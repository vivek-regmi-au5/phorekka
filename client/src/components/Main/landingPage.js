import React, { Component } from "react";
import * as actions from "../../actions/index";
import { connect } from "react-redux";
import CheckOut from "./../CheckOut";

class LandingPage extends Component {
  render() {
    return (
      <div>
        This is LandingPage
        <CheckOut />
      </div>
    );
  }
}

export default connect()(LandingPage);
