import React, { useEffect, useState, useDispatch } from "react";
import { connect } from "react-redux";
import {
  getCrowdFundedProducts,
  handleFormSubmit,
} from "./../../actions/profile";
import { setAlert } from "./../../actions/alert";
import M from "materialize-css";
import axios from "axios";

const Home = ({
  profile,
  getCrowdFundedProducts,
  crowdFundedProducts,
  handleFormSubmit,
  setAlert,
}) => {
  const [bio, setbio] = useState(null);
  const [location, setlocation] = useState(null);
  const [age, setage] = useState(null);
  const [message, setmessage] = useState(null);
  const [currentlyWorking, setcurrentlyWorking] = useState(null);
  const [instagram, setinstagram] = useState(null);
  const [facebook, setfacebook] = useState(null);
  const [youtube, setyoutube] = useState(null);
  const [twitter, settwitter] = useState(null);
  const [hobbies, setHobbies] = useState(null);

  // const dispatch = useDispatch();

  var hobby = [];

  useEffect(() => {
    if (profile) {
      getCrowdFundedProducts(profile._id);
    }
    axios.get(url).then((json) => setData(json.data));
  }, []);

  useEffect(() => {
    var elems = document.querySelectorAll(".chips-input");
    var instances = M.Chips.init(elems, {
      placeholder: "Your hobbies",
      secondaryPlaceholder: "Add more",
      data: [],
      onChipAdd: (event, chip) => {
        hobby = event[0].M_Chips.chipsData.map((chip) => {
          console.log(chip.tag);
          return chip.tag;
        });
        console.log(hobby);
      },
      onChipDelete: (event, chip) => {
        hobby = event[0].M_Chips.chipsData.map((chip) => {
          console.log(chip.tag);
          return chip.tag;
        });
        console.log(hobby);
      },
    });
  });
  const iconStyles = {
    fontSize: "2.7rem",
    margin: "3px",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var interests = hobby;
    const data = {
      bio,
      location,
      age,
      currentlyWorking,
      instagram,
      facebook,
      youtube,
      twitter,
      message,
      interests,
    };
    await handleFormSubmit(data);
    setAlert("Successfully account created");
  };

  return (
    <div className="row" style={{ marginTop: "25px" }}>
      {!profile && (
        <div>
          <h3 className="grey-text text-darken-2" style={{ marginLeft: "9%" }}>
            Fill the form to start your crowdfunding campaign
          </h3>
          <div class="row">
            <form onSubmit={(e) => handleSubmit(e)} class="col s10 offset-s1">
              <div class="row">
                <div class="col s6">
                  <div
                    style={{ marginBottom: "20px", marginTop: "15px" }}
                    class="input-field"
                  >
                    {" "}
                    <label for="bio">Bio</label>
                    <input
                      onChange={(e) => setbio(e.target.value)}
                      name="bio"
                      id="bio"
                      type="text"
                      class="validate"
                    />
                  </div>
                  <div
                    style={{ marginBottom: "20px", marginTop: "15px" }}
                    class="input-field"
                  >
                    {" "}
                    <label for="location">Location</label>
                    <input
                      onChange={(e) => setlocation(e.target.value)}
                      name="location"
                      id="location"
                      type="text"
                      class="validate"
                    />
                  </div>
                  <div
                    style={{ marginBottom: "20px", marginTop: "15px" }}
                    class="input-field"
                  >
                    {" "}
                    <label for="message">Message</label>
                    <input
                      onChange={(e) => setmessage(e.target.value)}
                      name="message"
                      id="message"
                      type="text"
                      class="validate"
                    />
                  </div>
                </div>

                <div class="col s6">
                  <div
                    style={{ marginBottom: "20px", marginTop: "15px" }}
                    class="input-field"
                  >
                    {" "}
                    <label for="age">Age</label>
                    <input
                      onChange={(e) => setage(e.target.value)}
                      name="age"
                      id="age"
                      type="text"
                      class="validate"
                    />
                  </div>
                  <div
                    style={{ marginBottom: "20px", marginTop: "15px" }}
                    class="input-field"
                  >
                    {" "}
                    <label for="currentlyWorking">Currently Working</label>
                    <input
                      onChange={(e) => setcurrentlyWorking(e.target.value)}
                      name="currentlyWorking"
                      id="currentlyWorking"
                      type="text"
                      class="validate"
                    />
                  </div>

                  <div className="chips-input"></div>
                </div>
              </div>

              <h5 className="grey-text text-lighten-1">Social</h5>
              <div className="row">
                <div class="col s6">
                  <div
                    style={{ marginBottom: "20px", marginTop: "15px" }}
                    class="input-field"
                  >
                    {" "}
                    <label for="instagram">Instagram link</label>
                    <input
                      onChange={(e) => setinstagram(e.target.value)}
                      name="instagram"
                      id="instagram"
                      type="text"
                    />
                  </div>
                  <div
                    style={{ marginBottom: "20px", marginTop: "15px" }}
                    class="input-field"
                  >
                    {" "}
                    <label for="facebook">Facebook link</label>
                    <input
                      onChange={(e) => setfacebook(e.target.value)}
                      name="facebook"
                      id="facebook"
                      type="text"
                    />
                  </div>
                </div>
                <div class="col s6">
                  <div
                    style={{ marginBottom: "20px", marginTop: "15px" }}
                    class="input-field"
                  >
                    {" "}
                    <label for="twitter">Twitter link</label>
                    <input
                      onChange={(e) => settwitter(e.target.value)}
                      name="twitter"
                      id="twitter"
                      type="text"
                    />
                  </div>
                  <div
                    style={{ marginBottom: "20px", marginTop: "15px" }}
                    class="input-field"
                  >
                    {" "}
                    <label for="youtube">Youtube link</label>
                    <input
                      onChange={(e) => setyoutube(e.target.value)}
                      name="youtube"
                      id="youtube"
                      type="text"
                      className="bordered"
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn waves-effect">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {profile && !crowdFundedProducts && (
        <div>
          <h1 style={{ marginLeft: "8%" }}>My Profile</h1>
          <div className="card" style={{ width: "100%" }}>
            <div
              style={{ height: "50vh" }}
              className="card horizontal offset-s1"
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
          </div>
          <div style={{ marginTop: "90%" }}>
            Click here to view product listings
          </div>
        </div>
      )}
      {profile && crowdFundedProducts && (
        <div>
          <h1 style={{ marginLeft: "8%" }}>My Profile</h1>
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
              {typeof crowdFundedProducts === "string" &&
                crowdFundedProducts.map((item) => {
                  return (
                    <div className="col s4">
                      <div className="card" style={{ width: "26rem" }}>
                        <img
                          style={{ width: "100%", height: "300px" }}
                          src="https://dilavr.com.ua/image/catalog/empty-img.png"
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
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.prof.profile,
    crowdFundedProducts: state.prof.crowdFundItems,
  };
};

export default connect(mapStateToProps, {
  getCrowdFundedProducts,
  handleFormSubmit,
  setAlert,
})(Home);
