const router = require("express").Router();
const userController = require("../../../controllers").userController;
console.log(userController);

router.route("/signUp")
    .post((req, res) => {
        console.log(req.params);
        console.log(res);
    });

module.exports = router;