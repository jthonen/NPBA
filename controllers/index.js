const models = require("../models");

// defining methods for the nba api controller

const nbaController = {
    loadHand: function(req, res) {
        return models.loadHand;
    },
    drawCards: function(req, res)   {
        return models.drawCards
    }

}

module.exports = nbaController;