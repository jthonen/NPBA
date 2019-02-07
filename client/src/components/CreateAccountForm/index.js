import React from "react";
import "./style.css";

function CreateAccountForm(props)   {
    return (
        <div id="CreateAccountForm">
            <input 
                id="userFullNameInput" 
                placeholder="Enter your full name"
                className="CreateAccountFormInput"
            ></input>
            <input 
                id="userEmailInput" 
                placeholder="Enter your email"
                className="CreateAccountFormInput"
            ></input>
            <input 
                id="userNameInput" 
                placeholder="Enter your username"
                className="CreateAccountFormInput"
            ></input>
            <input 
                id="userDOBInput" 
                placeholder="Enter your DOB"
                className="CreateAccountFormInput"
            ></input>
            <input 
                type="password"
                id="userPasswordInput"
                placeholder="Enter your password"
                className="CreateAccountFormInput"
            ></input>
            <button id="CreateAccountButton" onClick={() =>    {
                return props.handleClick();
            }}> Create Account </button>
        </div>
    );
};

export default CreateAccountForm;