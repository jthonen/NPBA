const db = require("../models/userModels");

module.exports = {
    signUp: function(req, res)  {
        db.User
        .create(req.body)
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }
}