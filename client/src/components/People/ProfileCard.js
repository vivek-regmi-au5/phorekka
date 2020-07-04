import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { SHOW_DISPLAY_PROFILE } from "./../../actions/types";

const ProfileCard = (props) => {
  return (
    <div>
      {props.alert && (
        <div className="alert alert-success">{props.alert.msg}</div>
      )}
      <div className="card mb-3" style={{ width: "100%" }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              src="data:image/png;base64,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"
              className="card-img"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{props.profile.name}</h5>
              <p className="card-text">{props.profile.bio}</p>
              <p className="card-text">
                <small className="text-muted">{props.profile.location}</small>
              </p>
            </div>
            <button
              onClick={() => {
                props.dispatch({
                  type: SHOW_DISPLAY_PROFILE,
                  payload: props.index,
                });

                console.log(props);
                props.history.push("/profile");
              }}
              className="btn btn-primary"
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default withRouter(connect(mapStateToProps)(ProfileCard));
