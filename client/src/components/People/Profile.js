import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCrowdFundItemsForDisplayProfile } from "./../../actions/profile";

const Profile = ({
  profile,
  getCrowdFundItemsForDisplayProfile,
  crowdFundItemsList,
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
      {/*<div className="card" style={{ width: "24rem" }}>
        <div className="card-body">
          <img
            src="data:image/png;base64,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"
            className="card-img"
            alt="..."
          />
          <h5 className="card-title">{profile.name}</h5>
          <p className="card-text">{profile.bio}</p>
        </div>
      </div>
      <div className="row">
        {crowdFundItemsList &&
          crowdFundItemsList.map((item) => {
            return (
              <div className="col-3 card m-3" style={{ width: "10rem" }}>
                <img
                  className="card-img-top"
                  src="https://thewanderers.travel/data_content/meet-the-wanderers/blank-user-img.jpg"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">{item.productId.title}</h5>
                  <p className="card-text">{item.productId.descriptionMain}</p>
                  <button className="btn btn-warning">
                    {item.productId.originalPrice}
                  </button>
                  <button className="btnm btn-primary">Buy Now</button>
                </div>
              </div>
            );
          })}
        </div>*/}

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
              <h4>{profile.name}</h4>
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
                      src="https://thewanderers.travel/data_content/meet-the-wanderers/blank-user-img.jpg"
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
                      <button className="btnm btn-primary">Buy Now</button>
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

export default connect(mapStateToProps, { getCrowdFundItemsForDisplayProfile })(
  Profile
);
