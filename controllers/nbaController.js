const models = require("../models");

const nbaController = {
    loadHand: function(req, res) {
        return models.loadHand;
    },
    drawCards: function(req, res)   {
        return models.drawCards
    }
};

module.exports = nbaController;