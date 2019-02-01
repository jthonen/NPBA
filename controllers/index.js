const data = require("../models");

// defining methods for the nba api controller

const nbaController = {
    loadHand: function(req, res) {
        return data;
    }
}

module.exports = nbaController;