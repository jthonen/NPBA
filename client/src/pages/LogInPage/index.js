import React, {Component} from "react";
import "./style.css";
import API from '../../utils/API';
import LogInOptions from "../../components/LogInOptions";
import InputDiv from "../../components/InputDiv";

class LogInPage extends Component   {

    state = {
        currentPhase: {"phase": "phase1", "subphase": "A"},
        LogInOptions: ["Sign In", "Create Account"]
    };

    // handle user choice between create account and sign in

    handleLogInOptionClick = (event) => {
        let phase2 = (event.target.id === "Create Account") ? {"phase": "phase2", "subphase": "A"} : {"phase": "phase2", "subphase": "B"};
        this.setState({currentPhase: phase2});
    }

    // handles return button click if user wants to return to initial components
    handleReturnButtonClick = () =>    {
        let returningTo = {"phase": "phase1", "subphase": "A"};
        this.setState({currentPhase: returningTo})
    }

    saveUsernameAndStartZoOmSession(username)   {
        sessionStorage.setItem("task", "authentication");
        sessionStorage.setItem("user", JSON.stringify(username));
        window.location.replace("/ZoOm");
    }

    // runs load zoom, calls API request for sign in authentication then after getting successful results 
    authenticateAgainstDB(signInInfo)    {
        API.signIn(signInInfo[0],signInInfo[1]).then((results) => {
            let username = results.data[0].userName;
            (results.data.length > 0) ? this.saveUsernameAndStartZoOmSession(username) : console.log("Username and/or password are incorrect");
        });
    };

    // grabs input values and passes them into checks that they are filled
    handleSignInButtonClick = () => {
        let unvalidatedUsername = {"value": document.getElementById("userNameInput").value, "type": "username or email"};
        let unvalidatedPassword = {"value": document.getElementById("userPasswordInput").value, "type": "password"};
        let unvalidatedUserInputSet = [unvalidatedUsername, unvalidatedPassword];
        let validatingInputSet = unvalidatedUserInputSet.map((unvalidatedUserInput)  =>  {
            let validating = (unvalidatedUserInput.value !== "")  ? unvalidatedUserInput.value : "Please enter your "+unvalidatedUserInput.type;
            return validating;
        });
    
        let tellUserToInputUsernameAndOrPassword = ((validatingInputSet[0] === "Please enter your username or email") && (validatingInputSet[1] === "Please enter your password")) ? 
            "Please enter your username & password" : (validatingInputSet[0] === "Please enter your username or email") ? 
                validatingInputSet[0] : (validatingInputSet[1] === "Please enter your password") ? 
                    validatingInputSet[1] : validatingInputSet;
        return (Array.isArray(tellUserToInputUsernameAndOrPassword)) ? this.authenticateAgainstDB(tellUserToInputUsernameAndOrPassword): alert(tellUserToInputUsernameAndOrPassword);

    }

    saveUserAndStartZoOmEnrollment(user)    {
        API.signUp(user);
        sessionStorage.setItem("task", "enrollment");
        sessionStorage.setItem("user", user.userName);
        return setTimeout(function()    {
            window.location.replace("/ZoOmAuthentication");
        }, 2000);
    }

    verifyAgainstOtherUsers(inputtedUser)   {
        API.checkUsernameExists().then((results) =>    {
            console.log(results);
            results.data.includes(inputtedUser.userName) ? alert("We're sorry but that username is unavailable, please select another.") : this.saveUserAndStartZoOmEnrollment(inputtedUser);
        }); 
    }

    formValidationCreate = (inputtedUser) => {
        return (inputtedUser.userName === '') || 
        (inputtedUser.userEmail === '') || 
        (inputtedUser.userPassword === '') ||
        (inputtedUser.userFullName === '') ||
        (inputtedUser.userDOB === '') ? "false": "true";
    }

    handleCreateAccountClick = () => {  
        let inputtedUser = {
            userName: document.getElementById('userNameInput').value,
            userEmail:document.getElementById('userEmailInput').value,
            userPassword:document.getElementById('userPasswordInput').value,
            userFullName:document.getElementById('userFullNameInput').value,
            userDOB:document.getElementById('userDOBInput').value
        };
        (this.formValidationCreate(inputtedUser) === "true") ? this.verifyAgainstOtherUsers(inputtedUser) : alert("Please fill out this form in its entirety"); 
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
                            handleCreateAccountClick={this.handleCreateAccountClick}
                        />
                }
            </div>
        );
    };
};

export default LogInPage;