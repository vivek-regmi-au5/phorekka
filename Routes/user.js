const router = require("express-promise-router")();
const passport = require("passport");
const passportConf = require("./../passport");
const User = require("./../Models/user");

const { validateBody, schemas } = require("./../helpers/routeHelpers");

router.post(
  "/signup",
  validateBody(schemas.authSchema),
  require("../Controllers/user").signup
);
router.post(
  "/signin",
  validateBody(schemas.signinSchema),
  passport.authenticate("local", { session: false }),
  require("../Controllers/user").signin
);
router.post(
  "/google/oauth",
  passport.authenticate("googleToken", {
    session: false,
    scope: ["profile", "email", "displayName"],
  }),
  require("../Controllers/user").googleOauth
);

router.post(
  "/facebook/oauth",
  passport.authenticate("facebookToken", { session: false }),
  require("../Controllers/user").facebookOauth
);

// Update user route. Created specially for the purpose of adding user gravatar image
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { name, image } = req.body;

      //Build user fields
      const userFields = {};
      if (name) userFields.name = name;
      if (image) userFields.image = image;

      const user = await User.findByIdAndUpdate(
        { _id: req.user._id },
        { $set: userFields },
        { new: true }
      );
      res.status(200).json(user);
    } catch (error) {}
  }
);

// Update user route. Created specially for the purpose of making the user influencer
router.put(
  "/isInfluencer",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: req.user._id },
        { $set: { isInfluencer: true } },
        { new: true }
      );
      res.status(200).json(user);
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
