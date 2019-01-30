const express = require("express");
const userRoutes = require("./users");
//const nbaRoutes = require("./nba");

const router = express.Router();

// User routes
router.use("/users", userRoutes);

module.exports = router;