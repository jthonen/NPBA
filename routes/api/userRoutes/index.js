const router = require("express").Router();
const userController = require("../../../controllers").userController;

router.route("/signUp")
    .post((req, res) => {
        console.log(req.body);
        userController.signUp(req);
    });

router.route("/signIn/username/:username/password/:password")
    .get((req, res) =>  {
        userController.signIn(req, res);
    });

module.exports = router;