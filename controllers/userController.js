const db = require("../models/userModels");

module.exports = {
    signUp: function(req, res)  {
        db.User
        .create(req)
        .then()
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
    },
    checkUsernameExists: function(req, res) {
        db.User
            .find()
            .sort({ date: -1})
            .then((dbModel) =>    {
                let usernames = dbModel.map((user) =>   {
                    return user.userName;
                });
                res.send(usernames);
            })
            .catch(err => console.log(err));
    }
}