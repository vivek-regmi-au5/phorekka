import React from "react";
import { connect } from "react-redux";

const Profile = ({ profile }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{profile.name}</h5>
        <p className="card-text">{profile.bio}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.prof.displayProfile,
  };
};

export default connect(mapStateToProps)(Profile);
