import React from "react";
import { connect } from "react-redux";
import { setAlert } from "./../../actions/alert";

const Alert = ({ alert }) => {
  return (
    <div>
      {alert.msg && (
        <p className={`alert alert-${alert.alertType}`}>{alert.msg}</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
  };
};

export default connect(mapStateToProps, { setAlert })(Alert);
