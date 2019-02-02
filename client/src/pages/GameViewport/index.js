import React, {Component} from "react";
import "./style.css";
import UsersHand from "../../components/UsersHand";
import API from "../../utils/API";

class GameViewport extends Component    {
    state = {
        DealingHandArray: []
    };

    loadHand = () =>  {
        API.loadHand()
        .then((res) => {
            let initialHand = res.data.nba_data.map((player) =>   {
                player.usersDecision = "HOLD";
                return player;
            })
            return this.setState({DealingHandArray: initialHand});
        })
        .catch(err => console.log(err));
    };

    handleCardClick = (event) => {
        let decision = {"prevRendered": event.target.value, "name": event.target.name};
        console.log(decision);
        let DealtArray = this.state.DealingHandArray;
        let updatedArray = DealtArray.map((PlayerCard) =>  {
            if (PlayerCard.name === decision.name)  {
                PlayerCard.usersDecision = (decision.prevRendered === "HOLD") ? "CANCEL" : "HOLD";
            };
            return PlayerCard;
        });
        console.log(updatedArray);
        this.setState({DealingHandArray: updatedArray})
    };

    componentDidMount() {
        this.loadHand();
    };

    render()    {
        return (
            <div id="GameViewport">
                <UsersHand UsersHandArray={this.state.DealingHandArray} handleClick={this.handleCardClick}/>
            </div>
        );
    };
};

export default GameViewport;