import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import * as actions from "./../actions/index";
import CustomInput from "./CustomInput";

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
      this.props.history.push("/dashboard");
    }
  }
  async responseGoogle(res) {
    console.log("responseGoogle: ", res);
    await this.props.oauthGoogle(res.accessToken);
    if (!this.props.errorMessage) {
      this.props.history.push("/dashboard");
    }
  }

  async responseFacebook(res) {
    console.log("responseFacebook: ", res);
    await this.props.oauthFacebook(res.accessToken);
    if (!this.props.errorMessage) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset>
              <Field
                name="email"
                type="text"
                id="email"
                component={CustomInput}
                label="Enter your email"
                placeholder="example@example.com"
              />
            </fieldset>
            <fieldset>
              <Field
                name="password"
                type="password"
                id="password"
                component={CustomInput}
                label="Enter your password"
                placeholder="password"
              />
              <button className="btn btn-primary" type="submit">
                Signup
              </button>
              {this.props.errorMessage ? (
                <div className="alert alert-danger">
                  {this.props.errorMessage}
                </div>
              ) : null}
            </fieldset>
          </form>
        </div>
        <div className="col">
          <div className="alert alert-primary">Signup using 3rd party</div>
          <div className="text-center">
            <FacebookLogin
              appId="3114357415321475"
              textButton="Facebook"
              fields="name, email, picture"
              callback={this.responseFacebook}
            />
            <GoogleLogin
              clientId="959283301750-cvgdn8sdcf1afcsfdolavtqavf89ubjk.apps.googleusercontent.com"
              buttonText="Google"
              fields="name, email, picture"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
            />
          </div>
        </div>
      </div>
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
