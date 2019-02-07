import React from "react";
import "./style.css";

function ReturnButton(props) {
    return  (
        <div className="return" onClick={() =>    {
            return props.handleClick();
        }}>
             <h4 className="returnIconText"> Go back
                <img className="returnIcon" alt="return" src="./Untitled-1.png"></img>
             </h4>
        </div>
    );
};

export default ReturnButton;
