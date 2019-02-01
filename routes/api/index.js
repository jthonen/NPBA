const router = require("express").Router();
const nbaRoutes = require("./nbaRoutes");

// NBA routes
router.use("/nba", nbaRoutes);

module.exports = router;