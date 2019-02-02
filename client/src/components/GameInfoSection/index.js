import React from "react";
import "./style.css";

function GameInfoSection(props) {
    return (
        <div className="GameInfoSection" key={props.item.header + "_div"}>

            <h2
                key={props.item.header + "_header"}
                className="GameInfoHeader"
                id={props.item.header + "_header"}>

                {props.item.header}:

                        </h2>

            <h1
                key={props.item.header + "Num"}
                id={props.item.header}
                className="GameInfoValues">

            </h1>

        </div>
    );
};

export default GameInfoSection;