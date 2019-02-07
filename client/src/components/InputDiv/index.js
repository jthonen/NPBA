import React from "react";
import "./style.css";
import ReturnButton from "../ReturnButton";
import SignInForm from "../SignInForm";

function InputDiv(props)    {
    return (
        <div id="InputDiv">
            <ReturnButton handleClick={props.handleReturnButtonClick}/>
            {(props.currentPhase.subphase === "B") ? 
                <SignInForm handleClick={props.handleSignInButtonClick}/> :
                console.log("Create Account Div")
            }
        </div>
    );
};

export default InputDiv;