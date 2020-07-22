import React, { Component } from "react";
import BackGround from "./../../images/bg4.jpg";

import { connect } from "react-redux";

class LandingPage extends Component {
  render() {
    var sectionStyle = {
      width: "100%",
      height: "100vh",
      backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.73)),
      url(${BackGround})`,

      backgroundSize: "cover",
      background: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",

      // filter: "brightness(50%)",
    };
    return (
      <div style={sectionStyle}>
        <div className="row">
          <div className="col s6">
            <div style={{ marginLeft: "4%" }}>
              <p
                style={{
                  fontSize: "6rem",
                  fontFamily: "Oswald",
                  marginTop: "50px",
                  marginBottom: "30px",
                }}
                className="grey-text text-lighten-2"
              >
                A platform for budding influencers to grow their influence
              </p>
              <button className="btn-large waves-effect">Get Started</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(LandingPage);
