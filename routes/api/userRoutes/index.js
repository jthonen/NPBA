const router = require("express").Router();
const userController = require("../../../controllers").userController;

router.route("/signUp")
    .post((req, res) => {
        userController.signUp(req.body);
    });

router.route("/signIn/username/:username/password/:password")
    .get((req, res) =>  {
        userController.signIn(req, res);
    });

router.route("/checkUsernameExists")
    .get((req, res) =>  {
        userController.checkUsernameExists(req, res);
    });

router.route("/postingSessionKey")
    .post((req, res) => {
        userController.postingSessionKey(req.body);
    });

router.route("/getSessionKey/user/:user/key/:key")
    .get((req, res) => {
        let query = {userName: req.params.user, sessionKey: req.params.key};
        userController.getSessionKey(query, res);
    });

module.exports = router;