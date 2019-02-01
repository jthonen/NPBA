import React from "react";
import "./style.css";

function PlayerCard(props) {
    console.log(props);
    return (
        <div className="PlayerCard" id={props.PlayerCardInHand.name}>
            <div className="CardBackground">
                <img className="TeamLogo" alt={props.PlayerCardInHand.logo+" as displayed on card"} src={props.PlayerCardInHand.logo} />
                <img className="PlayerImage" alt={props.PlayerCardInHand.name+" image"} src={props.PlayerCardInHand.image} />                
            </div>
            <div className="CardUtilitySection">
                <div className="FantasyPointsDisplay"> 
                    <h1>
                        {props.PlayerCardInHand.fantasy_points}
                    </h1>
                </div>
            </div> 
        </div>
    );
};

export default PlayerCard;