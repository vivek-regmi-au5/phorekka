import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profile";
import Spinner from "../Main/Spinner";
import ProfileCard from "./ProfileCard";

const People = ({ getProfiles, profiles }) => {
  useEffect(() => {
    getProfiles();
  }, []);
  return (
    <div>
      <h1 className="text-primary">People</h1>
      {!profiles.profiles && <Spinner />}
      {profiles.profiles &&
        profiles.profiles.map((profile, index) => (
          <ProfileCard profile={profile} index={index} key={profile._id} />
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profiles: state.prof,
  };
};

export default connect(mapStateToProps, { getProfiles })(People);
