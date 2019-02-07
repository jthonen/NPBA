const router = require("express").Router();
const nbaRoutes = require("./nbaRoutes");
const userRoutes = require("./userRoutes");
const ZoomRoutes = require("./zoomRoutes");

// NBA routes
router.use("/nba", nbaRoutes);

router.use("/user", userRoutes);

router.use("/ZoOm", ZoomRoutes);

module.exports = router;