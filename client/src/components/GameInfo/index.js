import React from "react";
import "./style.css";
import GameInfoSection from "../GameInfoSection"

function GameInfo(props)    {
    return  (
        <div id="GameInfo">

            {props.InfoHeadersArray.map((item) =>  {
                return (
                    <GameInfoSection key={item.header+"_Section"} item={item}/>
                );
            })}

        </div>
    );
};

export default GameInfo;