const router = require("express").Router();
const nbaRoutes = require("./nbaRoutes");
const userRoutes = require("./userRoutes");

// NBA routes
router.use("/nba", nbaRoutes);

router.use("/user", userRoutes);

module.exports = router;