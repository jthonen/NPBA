const db = require("../models/userModels");

module.exports = {
    signUp: function(req, res)  {
        db.User
        .create(req.body)
        // do something other than console.log(data);
        .then(data => console.log(data))
        .catch(err => console.log(err))
    },
    signIn: function(req, res)  {
        db.User
            .find()
            .sort({ date: -1 })
            .then(dbModel => {
                let access = dbModel.filter((user) =>  {
                    if ((user.userName === req.params.username) && (user.userPassword === req.params.password)) {
                        return user;
                    };
                });
                console.log(access);
                res.send(access);
            })
            .catch(err => console.log(err));
    }
}