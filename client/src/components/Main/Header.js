import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { setAlert } from "../../actions/alert";

class Header extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }
  signOut() {
    console.log("signout got called");
    this.props.signOut();
    this.props.setAlert("You have signed out successfully", "success");
  }
  render() {
    console.log("props at header: ", this.props);
    return (
      <nav>
        <div className="nav-wrapper" style={{ marginLeft: "1%" }}>
          <Link className="brand-logo" to="/">
            Phorekka
          </Link>

          <ul id="nav-mobile" className="right">
            {this.props.isAuth && (
              <li>
                <Link to="/home">Home</Link>
              </li>
            )}

            <li key="people">
              <Link to="/people">People</Link>
            </li>

            <li key="product">
              <Link to="/product">Product</Link>
            </li>
            {!this.props.isAuth
              ? [
                  <li key="signup">
                    <Link to="/signup">Register</Link>
                  </li>,
                ]
              : null}
            {this.props.isAuth
              ? [
                  <li key="signout" onClick={this.signOut}>
                    <Link to="/signin">Signout</Link>
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

export default withRouter(connect(mapStateToProps, actions)(Header));
