import React, { Component } from "react";
import { connect } from "react-redux";

export default (OriginalComponent) => {
  class MixedComponent extends Component {
    checkAuth() {
      if (!this.props.isAuth && !this.props.jwtToken) {
        console.log("You have no access");
        this.props.history.push("/");
      }
    }
    componentDidMount() {
      this.checkAuth();
    }

    componentDidUpdate() {
      this.checkAuth();
    }
    render() {
      return <OriginalComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      isAuth: state.auth.isAuthenticated,
      jwtToken: state.auth.token,
    };
  }

  return connect(mapStateToProps)(MixedComponent);
};
