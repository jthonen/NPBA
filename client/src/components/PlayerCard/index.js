import React from "react";
import "./style.css";
import CardButton from "../CardButton";

function PlayerCard(props) {
    return (
        <div className="PlayerCard" id={props.PlayerCardInHand.name}>
            <div 
                className="CardBackground"
                style={props.PlayerCardInHand.team_style}>
                <img 
                    className="TeamLogo"
                    alt={props.PlayerCardInHand.logo+" as displayed on card"}
                    src={props.PlayerCardInHand.logo}/>
                <img 
                    className="PlayerImage"
                    alt={props.PlayerCardInHand.name+" image"}
                    src={props.PlayerCardInHand.image} />
                <h2 
                    className="PlayerName"> 
                    {props.PlayerCardInHand.name} 
                </h2>        
            </div>
            <div className="CardUtilitySection">
                <div className="CardButtonSection">
                    <CardButton
                        card={props.PlayerCardInHand}
                        handleClick={props.UsersHand.props.handleClick}
                    />
                </div>
            </div> 
        </div>
    );
};

export default PlayerCard;