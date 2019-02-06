import axios from "axios";

export default {
  loadHand: function() {
    return axios.get("/api/nba/loadHand");
  },
  drawCards: function(drawing) {
    return axios.get("/api/nba/drawCards/"+drawing);
  },
  signUp: function()  {
    return axios.get("/api/user/signUp");
  }

};