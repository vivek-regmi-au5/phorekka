import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCrowdFundItemsForDisplayProfile } from "./../../actions/profile";
import { Redirect, withRouter, Link } from "react-router-dom";
import Checkout from "./../CheckOut";

const Profile = ({
  profile,
  getCrowdFundItemsForDisplayProfile,
  crowdFundItemsList,
  history,
}) => {
  useEffect(() => {
    getCrowdFundItemsForDisplayProfile(profile._id);
  }, []);
  const iconStyles = {
    fontSize: "2.7rem",
    margin: "3px",
  };
  return (
    <div className="row" style={{ marginTop: "25px" }}>
      <div
        style={{ height: "50vh" }}
        className="card horizontal col s10 offset-s1"
      >
        <div style={{ width: "50vh" }} class="card-image">
          <img
            style={{ height: "100%", width: "100%" }}
            src="https://thewanderers.travel/data_content/meet-the-wanderers/blank-user-img.jpg"
          />
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <div style={{ height: "85%" }}>
              <h4>{profile.user.name}</h4>
              <span>{profile.age}</span>
              <br />
              <span>{profile.location}</span>
              <br />
              <span>{profile.bio}</span>
              <br />
              <span>{profile.message}</span>
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
        </div>
      </div>
      <div className="col s10 offset-s1" style={{ border: "none" }}>
        <div className="row">
          {crowdFundItemsList &&
            crowdFundItemsList.map((item) => {
              return (
                <div className="col s4">
                  <div className="card" style={{ width: "26rem" }}>
                    <img
                      style={{ width: "100%", height: "300px" }}
                      src={item.productId.images[0]}
                      alt="Card cap"
                    />
                    <div className="card-content">
                      <h5 className="card-title">{item.productId.title}</h5>
                      <p className="card-text">
                        {item.productId.descriptionMain}
                      </p>
                    </div>
                    <div className="card-action">
                      <button className="btn btn-warning">
                        {item.productId.originalPrice}
                      </button>
                      <Checkout item={item} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.prof.displayProfile,
    crowdFundItemsList: state.prof.displayProfileCrowdFundItems,
  };
};

export default connect(mapStateToProps, {
  getCrowdFundItemsForDisplayProfile,
})(withRouter(Profile));
