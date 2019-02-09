import React from "react";
import "./style.css";

function GameInfoSection(props) {
    return (
        <div className="GameInfoSection" key={props.item.header + "_div"}>

            <h3
                key={props.item.header + "_header"}
                className="GameInfoHeader"
                id={props.item.header + "_header"}>

                {props.item.header}:

                        </h3>

            <h2
                key={props.item.header + "Num"}
                id={props.item.header}
                className="GameInfoValues">
                {(props.item.header === "HAND TOTAL") ? 
                    Math.round(props.HandTotal) || "---" : (props.item.header === "BETTING") ? props.Bet : props.Credits}
            </h2>

        </div>
    );
};

export default GameInfoSection;