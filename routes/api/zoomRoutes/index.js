const axios = require("axios");
const router = require("express").Router();
//const userController = require("../../../controllers").userController;

router.route("/authenticate")
    .post((req, res) => {
        // let headers = {
        //     "X-App-Token":"d7fb5IUijPxK6R4zVqFfq2fDYMlfLRVH",
        // };

        // axios.post("https://api.zoomauth.com/api/v1/biometrics/authenticate", headers, req.body.dataToUpload)
        // .then(res =>  {
        //     return console.log(res)
        // })
        // .catch(err =>   {
        //     return console.log(err.data);
        // })
    });

module.exports = router;