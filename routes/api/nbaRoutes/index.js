const router = require("express").Router();
const crunch = require("../../../controllers");

router.route("/")
    .get((req, res) =>  {
        res.json(crunch.loadHand());
    });

module.exports = router;