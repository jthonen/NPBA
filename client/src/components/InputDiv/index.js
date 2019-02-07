import React from "react";
import "./style.css";
import ReturnButton from "../ReturnButton";
import SignInForm from "../SignInForm";
import CreateAccountForm from "../CreateAccountForm";

function InputDiv(props)    {
    return (
        <div id="InputDiv">
            <ReturnButton handleClick={props.handleReturnButtonClick}/>
            {(props.currentPhase.subphase === "B") ? 
                <SignInForm handleClick={props.handleSignInButtonClick}/> :
                <CreateAccountForm handleClick={props.handleCreateAccountClick} />
            }
        </div>
    );
};

export default InputDiv;