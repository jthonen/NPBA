import React, {Component} from "react";
import "./style.css";
import API from '../../utils/API';
import LogInOptions from "../../components/LogInOptions";
import InputDiv from "../../components/InputDiv";

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

class LogInPage extends Component   {

    state = {
        currentPhase: {"phase": "phase1", "subphase": "A"},
        LogInOptions: ["Sign In", "Create Account"]
    };

    handleLogInOptionClick = (event) => {
        let phase2 = (event.target.id === "Create Account") ? {"phase": "phase2", "subphase": "A"} : {"phase": "phase2", "subphase": "B"};
        this.setState({currentPhase: phase2});
    }

    handleReturnButtonClick = () =>    {
        let returningTo = {"phase": "phase1", "subphase": "A"};
        this.setState({currentPhase: returningTo})
    }

    handleSignInButtonClick = () => {
        console.log("SIGN IN BUTTON CLICKED");
        let unvalidatedUsername = {"value": document.getElementById("userNameInput").value, "type": "username or email"};
        let unvalidatedPassword = {"value": document.getElementById("userPasswordInput").value, "type": "password"};
        let unvalidatedUserInputSet = [unvalidatedUsername, unvalidatedPassword];
        checkUserInputFilled(unvalidatedUserInputSet);

    }
    
    render()    {
        return  (
            <div id="LogInPage">
                {
                    (this.state.currentPhase.phase === "phase1") ? 
                        <LogInOptions
                            LogInOptions={this.state.LogInOptions}
                            handleClick={this.handleLogInOptionClick}
                        /> : 
                        <InputDiv
                            currentPhase={this.state.currentPhase}
                            handleReturnButtonClick={this.handleReturnButtonClick}
                            handleSignInButtonClick={this.handleSignInButtonClick}
                        />
                }
            </div>
        );
    };
};

export default LogInPage;