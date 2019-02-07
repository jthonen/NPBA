import React from "react";
import "./style.css";

function LogInOptions(props)    {
    return  (
        <div id="LogInOptions">
            {props.LogInOptions.map((LogInOption) => {
                return  (
                    <div 
                        key={LogInOption}
                        id={LogInOption} 
                        className="LogInOption"
                        onClick={(event) =>   {
                            return props.handleClick(event);
                    }}>
                        <h1 key={LogInOption+"H1"} className="LogInOptionText" > 
                            {LogInOption} 
                        </h1>
                    </div>
                );
            })}
        </div>
    )
};

export default LogInOptions;