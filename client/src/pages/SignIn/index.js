import React, { Component } from "react";
import API from '../../utils/API';
import SignIn from "../../components/SignIn";

function authenticateAgainstDB(signInInfo)    {
    API.signIn(signInInfo[0],signInInfo[1]).then((results) => {
        (results.data.length > 0) ? console.log(results.data) : console.log("Username and/or password are incorrect");
    })
}

function checkUserInputFilled(unvalidatedUserInputSet)    {
    let validatingInputSet = unvalidatedUserInputSet.map((unvalidatedUserInput)  =>  {
        let validating = (unvalidatedUserInput.value !== "")  ? unvalidatedUserInput.value : "Please enter your "+unvalidatedUserInput.type;
        return validating;
    });

    let tellUserToInputUsernameAndOrPassword = ((validatingInputSet[0] === "Please enter your username or email") && (validatingInputSet[1] === "Please enter your password")) ? 
        "Please enter your username & password" : (validatingInputSet[0] === "Please enter your username or email") ? 
            validatingInputSet[0] : (validatingInputSet[1] === "Please enter your password") ? 
                validatingInputSet[1] : validatingInputSet;
    return (Array.isArray(tellUserToInputUsernameAndOrPassword)) ? authenticateAgainstDB(tellUserToInputUsernameAndOrPassword): alert(tellUserToInputUsernameAndOrPassword);
};

class Signin extends Component {
    
    handleClick = () => {
        let unvalidatedUsername = {"value": document.getElementById("formBasicEmail").value, "type": "username or email"};
        let unvalidatedPassword = {"value": document.getElementById("formBasicPassword").value, "type": "password"};
        let unvalidatedUserInputSet = [unvalidatedUsername, unvalidatedPassword];
        checkUserInputFilled(unvalidatedUserInputSet);
    };

    render() {
        return (
            <SignIn 
                handleClick={this.handleClick} />
        )
    };
}

export default Signin;