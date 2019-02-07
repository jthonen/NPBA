import React, {Component} from "react";
import "./style.css";
import API from '../../utils/API';
import LogInOptions from "../../components/LogInOptions";
import InputDiv from "../../components/InputDiv";
import ZoOmFunctions from "../../components/ZoOmAuthentication/ZoomFunctions";
import ZoOmAuthentication from "../../components/ZoOmAuthentication";

const appendLog = ZoOmFunctions.appendLog;
const loadZoomAuthenticationJS = ZoOmFunctions.loadZoomAuthenticationJS;
const preloadZoom = ZoOmFunctions.preloadZoom;
const initializeOnlineWithLicense = ZoOmFunctions.initializeOnlineWithLicense;
const checkBrowserSupport = ZoOmFunctions.checkBrowserSupport;
const setupCameraAndVideoElement = ZoOmFunctions.setupCameraAndVideoElement;
const prepareInterface = ZoOmFunctions.prepareInterface;


function timer(run, time) {
    return setTimeout(function() {
      run();
    }, time);
}

function loadAndPreloadZoOm(user)   {
    console.log(user);
    loadZoomAuthenticationJS();
    timer(preloadZoom, 1000);
    timer(initializeOnlineWithLicense, 2500);
    timer(checkBrowserSupport, 3500);
    timer(setupCameraAndVideoElement, 4000);
    timer(prepareInterface, 5000)
};

class LogInPage extends Component   {

    state = {
        currentPhase: {"phase": "phase1", "subphase": "A"},
        LogInOptions: ["Sign In", "Create Account"]
    };

    launchZoOm(user)    {
        this.setState({currentPhase: {"phase": "phase3", "subphase": "B"}});
        window.onload = function () {
            appendLog("window.onload fired.");
        };
        loadAndPreloadZoOm(user);
    }

    authenticateAgainstDB(signInInfo)    {
        API.signIn(signInInfo[0],signInInfo[1]).then((results) => {
            let user = results.data[0];
            (results.data.length > 0) ?
                this.launchZoOm(user) : console.log("Username and/or password are incorrect");
        })
    }

    checkUserInputFilled(unvalidatedUserInputSet)    {
        let validatingInputSet = unvalidatedUserInputSet.map((unvalidatedUserInput)  =>  {
            let validating = (unvalidatedUserInput.value !== "")  ? unvalidatedUserInput.value : "Please enter your "+unvalidatedUserInput.type;
            return validating;
        });
    
        let tellUserToInputUsernameAndOrPassword = ((validatingInputSet[0] === "Please enter your username or email") && (validatingInputSet[1] === "Please enter your password")) ? 
            "Please enter your username & password" : (validatingInputSet[0] === "Please enter your username or email") ? 
                validatingInputSet[0] : (validatingInputSet[1] === "Please enter your password") ? 
                    validatingInputSet[1] : validatingInputSet;
        return (Array.isArray(tellUserToInputUsernameAndOrPassword)) ? this.authenticateAgainstDB(tellUserToInputUsernameAndOrPassword): alert(tellUserToInputUsernameAndOrPassword);
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
        this.checkUserInputFilled(unvalidatedUserInputSet);
    }

    handleCreateAccountClick = () => {  
        let user = {
            userName: document.getElementById('userNameInput').value,
            userEmail:document.getElementById('userEmailInput').value,
            userPassword:document.getElementById('userPasswordInput').value,
            userFullName:document.getElementById('userFullNameInput').value,
            userDOB:document.getElementById('userDOBInput').value
        };
        console.log(user);
        // return API.signUp(user);
    }
    
    render()    {
        console.log(this);
        return  (
            <div id="LogInPage">
                {
                    (this.state.currentPhase.phase === "phase1") ? 
                        <LogInOptions
                            LogInOptions={this.state.LogInOptions}
                            handleClick={this.handleLogInOptionClick}
                        /> : (this.state.currentPhase.phase === "phase2") ?
                        <InputDiv
                            currentPhase={this.state.currentPhase}
                            handleReturnButtonClick={this.handleReturnButtonClick}
                            handleSignInButtonClick={this.handleSignInButtonClick}
                            handleCreateAccountClick={this.handleCreateAccountClick}
                        /> : <ZoOmAuthentication LogInPageState={this.state}/>
                }
            </div>
        );
    };
};

export default LogInPage;