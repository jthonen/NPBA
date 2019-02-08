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
    })

router.route("/postingSessionKey")
    .post((req, res) => {
        userController.postingSessionKey(req.body);
    })

module.exports = router;