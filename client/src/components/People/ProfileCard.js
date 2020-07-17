import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { SHOW_DISPLAY_PROFILE } from "./../../actions/types";

const ProfileCard = (props) => {
  const iconStyles = {
    fontSize: "2.7rem",
    margin: "3px",
  };
  return (
    <div className="row">
      {props.alert && (
        <div className="alert alert-success">{props.alert.msg}</div>
      )}

      <div
        style={{ height: "50vh" }}
        className="card horizontal col s10 offset-s1"
      >
        <div style={{ width: "50vh" }} class="card-image">
          <img
            style={{ height: "100%", width: "100%" }}
            src="https://lorempixel.com/100/190/nature/6"
          />
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <div style={{ height: "85%" }}>
              <h4>{props.profile.name}</h4>
              <span>{props.profile.age}</span>
              <br />
              <span>{props.profile.location}</span>
              <br />
              <span>{props.profile.bio}</span>
              <br />
              <span>{props.profile.message}</span>
              <br />
            </div>
            <div className="right-align">
              <i
                style={iconStyles}
                class="fa fa-facebook-official"
                aria-hidden="true"
              ></i>
              <i
                style={iconStyles}
                class="fa fa-twitter-square"
                aria-hidden="true"
              ></i>
              <i
                style={iconStyles}
                class="fa fa-instagram"
                aria-hidden="true"
              ></i>
              <i
                style={iconStyles}
                class="fa fa-youtube-play"
                aria-hidden="true"
              ></i>
            </div>
          </div>
          <div class="card-action">
            <a
              onClick={() => {
                props.dispatch({
                  type: SHOW_DISPLAY_PROFILE,
                  payload: props.index,
                });

                console.log(props);
                props.history.push("/profile");
              }}
            >
              View Profile
            </a>
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
