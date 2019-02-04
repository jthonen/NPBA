import React from "react";
import "./style.css";

function CardButton(props) {
    return (
        <button 
            className="CardButton"
            name={props.card.name}
            value={props.card.currentlyDisplayedOption}
            onClick={(event) => {
                return props.handleClick(event);
            }}
        >
            {props.card.currentlyDisplayedOption}
        </button>
    );
};

export default CardButton;