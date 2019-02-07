import React from "react";
import "./style.css";

function SignInForm(props)   {
    return (
        <div id="SignInForm">
            <input 
                id="userNameInput" 
                placeholder="Enter your username or email"
                className="SignInFormInput"
            ></input>
            <input 
                type="password"
                id="userPasswordInput"
                placeholder="Enter your password"
                className="SignInFormInput"
            ></input>
            <button id="SignInButton" onClick={() =>    {
                return props.handleClick();
            }}> Sign In </button>
        </div>
    );
};

export default SignInForm;