import React from "react";
import "./style.css";
import PanelButton from "../PanelButton";

function GameplayPanel(props)    {
    return  (
        <div id="GameplayPanel">
            {
                props.options.map((option)  =>  {
                    return (
                        <PanelButton 
                            key={option}
                            text={option}
                            handleClick={props.handleClick}/>
                    )
                })
            }
        </div>
    );
};

export default GameplayPanel;