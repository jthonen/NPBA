const db = require("../models/userModels");

module.exports = {
    signUp: function(req, res)  {
        db.User
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    }
}