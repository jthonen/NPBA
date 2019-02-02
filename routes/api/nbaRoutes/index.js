const router = require("express").Router();
const crunch = require("../../../controllers");

router.route("/loadHand")
    .get((req, res) =>  {
        let cards = crunch.loadHand()();
        res.json(cards);
    });

router.route("/drawCards/:drawCards")
    .get((req, res) =>  {
        let cards = crunch.drawCards()(req.params.drawCards);
        res.json(cards);
    })

module.exports = router;