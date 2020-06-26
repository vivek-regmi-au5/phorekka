import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./../actions";

class Header extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }
  signOut() {
    console.log("signout got called");
    this.props.signOut();
  }
  render() {
    console.log("props at header: ", this.props);
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{ marginBottom: "30px" }}
      >
        <Link className="navbar-brand" to="/">
          Phorekka
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
          </ul>
          <ul className="nav navbar-nav ml-auto">
            {!this.props.isAuth
              ? [
                  <li className="nav-item" key="signup">
                    <Link className="nav-link" to="/signup">
                      Signup
                    </Link>
                  </li>,
                  <li className="nav-item" key="signin">
                    <Link className="nav-link" to="/signin">
                      Signin
                    </Link>
                  </li>,
                ]
              : null}
            {this.props.isAuth
              ? [
                  <li className="nav-item" key="signout" onClick={this.signOut}>
                    <Link className="nav-link" to="/signout">
                      Sign Out
                    </Link>
                  </li>,
                ]
              : null}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps, actions)(Header);
