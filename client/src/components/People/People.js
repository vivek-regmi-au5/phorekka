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
      <h1 className="grey-text text-darken-2">People</h1>
      {!profiles && <Spinner />}
      {profiles &&
        profiles.map((profile, index) => (
          <ProfileCard profile={profile} index={index} key={profile._id} />
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profiles: state.prof.profiles,
  };
};

export default connect(mapStateToProps, { getProfiles })(People);
