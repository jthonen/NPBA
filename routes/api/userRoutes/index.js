const router = require("express").Router();
const userController = require("../../../controllers").userController;

router.route("/signUp")
    .post((req, res) => {
        console.log(req.body);
        userController.signUp(req);

        //userController(req);

    });

module.exports = router;