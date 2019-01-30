let crunch = require("./data/apiCruncher.js");
var fs = require("fs");

module.exports = fs.readFile(__dirname+"/data/nba_api.json", function(err, result)   {
    if (err) {throw err}
    else    {
        const res = JSON.parse(result).resultSets[0];
        let data = {
            headers: res.headers,
            allStats: res.rowSet
        };
        allPlayers = crunch(data);
        console.log(allPlayers);
    };
});
