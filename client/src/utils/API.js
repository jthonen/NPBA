import axios from "axios";

export default {
  loadHand: function() {
    return axios.get("/api/nba");
  }
};