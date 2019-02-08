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
    },
    postingSessionKey: function(req, res) {
        let query = {userName: req.username}
        let update = {sessionKey: req.key}
        console.log(query);
        console.log(update);
        db.User
            .update(query, update)
            .sort({ date: -1})
            .then(data => console.log(data))
            .catch(err => console.log(err));
    },
    getSessionKey: function(req, res)   {
        console.log(req);
    }
}