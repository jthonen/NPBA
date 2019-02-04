import React, {Component} from "react";
import "./style.css";
import UsersHand from "../../components/UsersHand";
import GameplayPanel from "../../components/GameplayPanel";
import GameInfo from "../../components/GameInfo";
import API from "../../utils/API";

class GameViewport extends Component    {
    state = {
        DealingHandArray: [], 
        GameplayPanelOptions: ["BET ONE", "MAX BET", "DEAL", "DRAW"],
        InfoHeaders:   [
            {"header":"BETTING"},
            {"header": "HAND TOTAL"},
            {"header": "CREDITS"}
        ],
        betting: 0,
        handTotal: Number,
        credits: 200,
    };

    loadHand = () =>  {
        API.loadHand()
        .then((res) => {
            let initialHand = res.data.map((player) =>   {
                player.currentlyDisplayedOption = "HOLD";
                return player;
            });
            let handTotal = this.calculateHandTotal(initialHand);
            return this.setState({DealingHandArray: initialHand, handTotal: handTotal});
        })
        .catch(err => console.log(err));
    };

    handleCardClick = (event) => {
        let decision = {"prevRendered": event.target.value, "name": event.target.name};
        let DealtArray = this.state.DealingHandArray;
        let updatedArray = DealtArray.map((PlayerCard) =>  {
            if (PlayerCard.name === decision.name)  {
                PlayerCard.currentlyDisplayedOption = (decision.prevRendered === "HOLD") ? "CANCEL" : "HOLD";
            };
            return PlayerCard;
        });
        this.setState({DealingHandArray: updatedArray})
    };

    handleGameplayPanelClick = (event) =>   {
        let optionClicked = event.target.id;
        switch (optionClicked)  {
            case "BET ONE":
                let bet = this.state.betting;
                bet++
                this.setState({betting: bet});
                return;
            case "MAX BET":
                let initialBet = this.state.betting;
                bet = initialBet+5;
                this.setState({betting: bet});
                return;
            case "DEAL":
                this.loadHand();
                break;
            default: 
                this.determineDraw()
                return;
        }
    };

    determineDraw = () => {
        var usersDecision = {"holding": [], "releasing": []};
        this.state.DealingHandArray.map((Card) =>   {
            return (Card.currentlyDisplayedOption === "CANCEL") ? usersDecision.holding.push(Card): usersDecision.releasing.push(Card);
        });
        API.drawCards(usersDecision.releasing.length).then((res) => {
            let holdingDrawn = res.data.map((card) =>   {
                card.currentlyDisplayedOption = "HOLD";
                return card;
            })
            usersDecision.holding.map((card) => {
                holdingDrawn.push(card);
            });
            let handTotal = this.calculateHandTotal(holdingDrawn);
            this.setState({DealingHandArray: holdingDrawn, handTotal: handTotal});
        });
        return usersDecision
    };

    calculateHandTotal = (hand) => {
        var handTotal = 0;
        hand.map((player) => {
            handTotal = handTotal+player.fantasy_points;
            return handTotal;
        });
        return handTotal
    };

    render()    {
        console.log(this.state);
        return (
            <div id="GameViewport">
                <div id="ViewportLeft">

                    <GameInfo 
                        InfoHeadersArray={this.state.InfoHeaders}
                        HandTotal={this.state.handTotal}
                        Bet={this.state.betting}
                        Credits={this.state.credits}/>

                </div>
                <div id="ViewportRight">
                    <UsersHand 
                        UsersHandArray={this.state.DealingHandArray}
                        handleClick={this.handleCardClick}/>

                    <GameplayPanel 
                        options={this.state.GameplayPanelOptions} 
                        handleClick={this.handleGameplayPanelClick}/>

                </div>

            </div>
        );
    };
};

export default GameViewport;