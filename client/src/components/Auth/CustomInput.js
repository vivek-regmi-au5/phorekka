import React, { Component, Fragment } from "react";

class CustomInput extends Component {
  render() {
    const {
      input: { value, onChange },
    } = this.props;
    return (
      <Fragment>
        <input
          style={{ margin: "0px" }}
          name={this.props.name}
          id={this.props.id}
          className="validate grey-text text-lighten-4"
          required
          type={this.props.type}
          value={value}
          onChange={onChange}
        />
        <label className="grey-text text-lighten-4" for={this.props.id}>
          {this.props.label}
        </label>
      </Fragment>
    );
  }
}

export default CustomInput;
