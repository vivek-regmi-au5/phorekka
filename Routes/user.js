const router = require("express-promise-router")();
const passport = require("passport");
const passportConf = require("./../passport");

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

router
  .route("/secret")
  .get(
    passport.authenticate("jwt", { session: false }),
    require("../Controllers/user").secret
  );

module.exports = router;
