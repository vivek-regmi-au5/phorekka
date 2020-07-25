import React, { Component, Fragment } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import * as actions from "../../actions/index";
import CustomInput from "./CustomInput";
import { Link } from "react-router-dom";
import BackGround from "./../../images/bg3.jpg";

var sectionStyle = {
  width: "100%",
  height: "100vh",
  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.73)),
  url(${BackGround})`,

  backgroundSize: "cover",
  background: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",

  // filter: "brightness(50%)",
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
  }
  async onSubmit(formData) {
    console.log("Submit() got called");
    console.log("form data: ", formData);
    await this.props.signUp(formData);
    if (!this.props.errorMessage) {
      this.props.history.push("/people");
    }
  }
  async responseGoogle(res) {
    console.log("responseGoogle: ", res);
    await this.props.oauthGoogle(res);
    if (!this.props.errorMessage) {
      this.props.history.push("/people");
    }
  }

  async responseFacebook(res) {
    console.log("responseFacebook: ", res);
    await this.props.oauthFacebook(res);
    if (!this.props.errorMessage) {
      this.props.history.push("/people");
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <Fragment>
        <div style={sectionStyle}>
          <div className="row">
            <div className="col s5">
              <h4 className="center-align grey-text text-lighten-5">
                Create your account
              </h4>
              <div className="row">
                <form
                  className="col s12"
                  id="reg-form"
                  onSubmit={handleSubmit(this.onSubmit)}
                >
                  <div className="row" style={{ marginBottom: "0px" }}>
                    <fieldset style={{ border: "none" }}>
                      <div className="input-field col s12 text-blue">
                        <Field
                          name="name"
                          type="text"
                          id="username"
                          component={CustomInput}
                          label="Name"
                        />
                      </div>
                    </fieldset>
                  </div>
                  <div class="row" style={{ marginBottom: "0px" }}>
                    <fieldset style={{ border: "none", paddingBotton: "0" }}>
                      <div class="input-field col s12">
                        <Field
                          name="email"
                          type="email"
                          id="useremail"
                          component={CustomInput}
                          label="Email"
                        />
                        <span
                          class="helper-text text-grey text-grey-lighten-4"
                          data-error="Enter a valid email"
                        ></span>
                      </div>
                    </fieldset>
                  </div>
                  <div class="row" style={{ marginBottom: "0px" }}>
                    <fieldset style={{ border: "none", paddingTop: "0" }}>
                      <div class="input-field col s12">
                        <Field
                          name="password"
                          type="password"
                          id="userpassword"
                          component={CustomInput}
                          label="Password"
                        />
                      </div>
                    </fieldset>
                    <div className="input-field col s12 center-align ">
                      <button
                        className="center-align btn btn-large btn-register waves-effect waves-light"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                    <div className="row">
                      <div className="col s12">
                        <p
                          className="grey-text text-lighten-4"
                          style={{ marginLeft: "5%" }}
                        >
                          Already have an account?{" "}
                          <Link to="/signin">Sign in </Link>
                        </p>
                        {this.props.errorMessage ? (
                          <div className="alert alert-danger">
                            {this.props.errorMessage}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <hr
                    style={{
                      width: "36%",
                      marginLeft: "5%",
                      display: "inline-block",
                      border: "0.5px solid gray",
                    }}
                  />
                  <span
                    style={{
                      marginLeft: "6%",
                      marginRight: "6%",
                      color: "gray",
                    }}
                  >
                    OR
                  </span>
                  <hr
                    style={{
                      width: "36%",
                      marginRight: "5%",
                      display: "inline-block",
                      border: "0.5px solid gray",
                    }}
                  />
                </form>
              </div>

              <div className="col s12">
                <div className="center-align">
                  <FacebookLogin
                    appId="3114357415321475"
                    textButton="Facebook Login"
                    fields="name, email, picture"
                    callback={this.responseFacebook}
                    cssClass="btn-large waves-effect waves-light indigo darken-4"
                  />
                  {/* <GoogleLogin
                clientId="959283301750-cvgdn8sdcf1afcsfdolavtqavf89ubjk.apps.googleusercontent.com"
                buttonText="Signup with Google"
                fields="profile, email, dispalyName"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                className="btn-large waves-effect waves-light"
             /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "signup" })
)(Signup);
