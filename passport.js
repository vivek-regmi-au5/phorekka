require("dotenv").config();
const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const localStrategy = require("passport-local").Strategy;
const { ExtractJwt } = require("passport-jwt");
const User = require("./Models/user");
const GoogleStrategy = require("passport-token-google").Strategy;
const FacebookTokenStrategy = require("passport-facebook-token");

// JWT strategy
passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        // Find the user

        const user = await User.findById(payload.sub);

        // Handle if no user found
        if (!user) {
          return done(null, false);
        }

        // Finally return user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// Google oauth strategy
passport.use(
  "googleToken",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("access token: ", accessToken);
        console.log("refresh token: ", refreshToken);
        console.log("profile: ", profile);

        const existingUser = await User.findOne({
          email: profile.emails[0].value,
        });

        // If user exists return the user
        if (existingUser) {
          console.log("User already exists in our db");
          return done(null, existingUser);
        }

        // If user doesnot exist create new user
        console.log("User doesnt exists, we are creating a new user");

        const newUser = new User({
          googleId: profile.id,
          email: profile.emails[0].value,
        });
        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

// passport.use(
//   "googleToken",
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     },
//     (accessToken, refreshToken, profile, done) => {
//       console.log(profile);
//       return done(null, profile);
//     }
//   )
// );

// Facebook token strategy
passport.use(
  "facebookToken",
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("access token: ", accessToken);
        console.log("refresh token: ", refreshToken);
        console.log("profile token: ", profile);

        // Check if the user already exists
        const existingUser = await User.findOne({
          facebookId: profile.id,
        });
        console.log(existingUser);
        // If user exists return the user
        if (existingUser) {
          console.log("User already exists in our db");
          return done(null, existingUser);
        }

        // If User doesnot exist create new User
        else {
          console.log("User doesnt exists, we are creating a new user");

          const newUser = new User({
            facebookId: profile.id,
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
          });
          await newUser.save();
          done(null, newUser);
        }
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

// Local Strategy
passport.use(
  new localStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
        // Handle if user doesnot exist

        if (!user) {
          return done(null, false);
        }

        // If email found compare password
        const isMatch = await user.isValidPassword(password);

        // If password is not correct, handle
        if (!isMatch) {
          return done(null, false);
        }

        // Otherwise return user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
