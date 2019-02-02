import React from "react";
import "./style.css";

function CardButton(props) {
    return (
        <button 
            className="CardButton"
            name={props.card.name}
            value={props.card.usersDecision}
            onClick={(event) => {
                return props.handleClick(event);
            }}
        >
            {props.card.usersDecision}
        </button>
    );
};

export default CardButton;