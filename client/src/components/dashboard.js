import React, { Component } from "react";
import * as actions from "./../actions/index";
import { connect } from "react-redux";

class Dashboard extends Component {
  async componentDidMount() {
    this.props.getSecret();
  }
  render() {
    return (
      <div>
        This is Dashboard
        <h1>{this.props.secret}</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    secret: state.dash.secret,
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
