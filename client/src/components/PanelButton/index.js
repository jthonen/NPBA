import React from "react";
import "./style.css";

function PanelButton(props)   {
    return  (
        <button
            id={props.text}
            className="PanelButton"
            onClick={(event) => {
                return props.handleClick(event);}}>

            <h1 
                id={props.text}
                className="PanelButtonText"> 
                    {props.text}
            </h1>

        </button>
    )
};

export default PanelButton;