import React from "react";
import "./style.css";

function MainProfilePanel(props)    {
    console.log(props);
    return (
        <div id="MainProfilePanel">
            <h5> @{props.username} </h5>
            <div id="Play" className="MainProfilePanelOptions" onClick={(event) =>  {
                return props.handlePlayClick(event);
            }}> Play </div>
            <div id="Friends" className="MainProfilePanelOptions"> Friends </div>
            <div id="Settings" className="MainProfilePanelOptions"> Settings </div>
        </div>
    );
};

export default MainProfilePanel;