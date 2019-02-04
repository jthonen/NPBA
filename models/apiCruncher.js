const API_DATA = require("./nba_data");

// teamStyleGuide is an array containing a style guide object for each nba team
const teamStyleGuide = [
    {team: "LAL", color: "#fdba33"},
    {team: "NOP", color: "#0c2340"},
    {team: "PHI", color: "#ef0022"},
    {team: "PHX", color: "#e76221"},
    {team: "UTA", color: "#f9a11e"},
    {team: "BKN", color: "#000"},
    {team: "SAS", color: "#959191"},
    {team: "LAC", color: "#ed174b"},
    {team: "BOS", color: "#00611b"},
    {team: "OKC", color: "#002d62"},
    {team: "NYK", color: "#f58426"},
    {team: "ATL", color: "#e21a37"},
    {team: "IND", color: "#ffb517"},
    {team: "POR", color: "#c00"},
    {team: "GSW", color: "#039"},
    {team: "MIL", color: "#00471b"},
    {team: "ORL", color: "#0077c0"},
    {team: "CHI", color: "#b00203"},
    {team: "MIN", color: "#2b6291"},
    {team: "CHA", color: "#00848e"},
    {team: "HOU", color: "#cd212b"},
    {team: "WAS", color: "#cf142b"},
    {team: "MEM", color: "#5d76a9"},
    {team: "CLE", color: "#860038"},
    {team: "TOR", color: "#bd1b21"},
    {team: "SAC", color: "#51388a"},
    {team: "DET", color: "#fa002c"},
    {team: "MIA", color: "#98002e"},
    {team: "DAL", color: "#006bb6"},
    {team: "DEN", color: "#feb927"}
];

// function Player prototype resembles the final objects outputted from the NBA site api
function Player(id, name, team, fantasy_points, team_color, team_style) {
    this.id = id;
    this.name = name;
    this.team = team;
    this.fantasy_points = fantasy_points;
    this.image = "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/"+id+".png";
    this.logo = "https://www.nba.com/assets/logos/teams/primary/web/"+team+".svg";
    this.team_color = team_color,
    this.team_style = team_style
};

// function makePlayerStatsArray is used to organize the data received from the NBA API
function makePlayerStatsArray(data, i) {
    var onePlayersStats = data.allStats[i];
    var playersStats = [];
    for (let j=0; j < onePlayersStats.length; j++)  {
        var headerAndValue = [data.headers[j], onePlayersStats[j]];
        playersStats.push(headerAndValue);
    };
    return playersStats;
};

// this function is used to give the teamStyleGuide values for each player object made in makePlayerObj
function givePlayerStyle(teamStyleGuide, startedPlayerObj)  {
    for (let k=0; k < teamStyleGuide.length; k++)    {
        teamStyleGuide[k].style = {
            "background": "linear-gradient(to bottom, "+teamStyleGuide[k].color+" 0%, "+teamStyleGuide[k].color+" 38%, transparent 100%) no-repeat, #0b1a36"};
        if (teamStyleGuide[k].team === startedPlayerObj.team)  {
            startedPlayerObj.team_color = teamStyleGuide[k].color;
            startedPlayerObj.team_style = teamStyleGuide[k].style;
        };
    };
    return startedPlayerObj;
};

// makePlayerObj sorts through the playerStats array
function makePlayerObj(onePlayersStats) {
    for (let j=0; j < onePlayersStats.length; j++) {
        var statsRow = onePlayersStats[j];
        switch (statsRow[0])    {
            case "PLAYER_ID":
                var player_id = statsRow[1];
                break;
            case "PLAYER_NAME":
                let fullName = statsRow[1].split(" ");
                let lastName = (fullName.length === 2) ? fullName[1] : ""+fullName[1]+" "+fullName[2]+"";
                var displayedName = statsRow[1][0]+". "+lastName;
                break;
            case "TEAM_ABBREVIATION":
                var player_team = statsRow[1];
                break;
            case "NBA_FANTASY_PTS":
                var player_fantasy_points = statsRow[1];
                break;
            default: break;
        };
        let startedPlayerObj = new Player(player_id, displayedName, player_team, player_fantasy_points, null, null);
        var finishedPlayerObj = givePlayerStyle(teamStyleGuide, startedPlayerObj);
    };
    return finishedPlayerObj;
};

// function allPlayers uses the functions above to make the final API json that will be sent to the front end for Player Cards
function allPlayers(data) {
    var playersArray = [];
    for (let i=0; i < data.allStats.length; i++)    {
        var onePlayersStats = makePlayerStatsArray(data, i);
        var filteredStats = makePlayerObj(onePlayersStats);
        playersArray.push(filteredStats);
    };
    return playersArray;
};

function loadHand()   {
    let api_data = API_DATA.resultSets[0];
    let data = {
        "headers": api_data.headers,
        "allStats": api_data.rowSet
    }
    let players = allPlayers(data);
    let hand = [];
    for (i=0; i < 5; i++)   {
        let randomIndex = Math.floor(Math.random() * Math.floor(players.length));
        hand.push(players[randomIndex]);
    };
    return hand;
};

function drawCards(num_cards_required)    {
    let api_data = API_DATA.resultSets[0];
    let data = {
        "headers": api_data.headers,
        "allStats": api_data.rowSet
    }
    let players = allPlayers(data);
    let drawing = [];
    for (i=0; i < num_cards_required; i++)   {
        let randomIndex = Math.floor(Math.random() * Math.floor(players.length));
        drawing.push(players[randomIndex]);
    };
    return drawing;
};

module.exports = {loadHand, drawCards};