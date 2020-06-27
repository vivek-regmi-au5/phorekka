import React, { Component } from "react";
import * as actions from "../actions/index";
import { connect } from "react-redux";

class LandingPage extends Component {
  async componentDidMount() {
    this.props.getSecret();
  }
  render() {
    return <div>This is LandingPage</div>;
  }
}

function mapStateToProps(state) {
  return {
    secret: state.dash.secret,
  };
}

export default connect(mapStateToProps, actions)(LandingPage);
