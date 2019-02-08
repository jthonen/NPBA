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


class LogInPage extends Component   {

    state = {
        currentPhase: {"phase": "phase1", "subphase": "A"},
        LogInOptions: ["Sign In", "Create Account"]
    };

    
    loadZoOm() {
        loadZoomAuthenticationJS();
        timer(preloadZoom, 1000);
        timer(initializeOnlineWithLicense, 2500);
        timer(checkBrowserSupport, 3500);
    };

    launchZoOm(subphase)    {
        this.setState({currentPhase: {"phase": "phase3", "subphase": subphase}});
        window.onload = function () {
            appendLog("window.onload fired.");
        };
    }

    authenticateAgainstDB(signInInfo)    {
        this.loadZoOm();
        API.signIn(signInInfo[0],signInInfo[1]).then((results) => {
            let user = results.data[0];
            (results.data.length > 0) ?
                this.launchZoOm(user, "B") : console.log("Username and/or password are incorrect");
            setupCameraAndVideoElement();
            timer(prepareInterface, 3000);
        })
    }

    saveUserToDbAndBeginZoomEnrollment(user)    {
        this.loadZoOm();
        API.signUp(user);
        this.launchZoOm("A");
        setupCameraAndVideoElement();
        timer(prepareInterface, 3000);
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
    }

    handleLogInOptionClick = (event) => {
        let phase2 = (event.target.id === "Create Account") ? {"phase": "phase2", "subphase": "A"} : {"phase": "phase2", "subphase": "B"};
        this.setState({currentPhase: phase2});
    }

    handleReturnButtonClick = () =>    {
        let returningTo = {"phase": "phase1", "subphase": "A"};
        this.setState({currentPhase: returningTo})
    }

    handleSignInButtonClick = () => {
        let unvalidatedUsername = {"value": document.getElementById("userNameInput").value, "type": "username or email"};
        let unvalidatedPassword = {"value": document.getElementById("userPasswordInput").value, "type": "password"};
        let unvalidatedUserInputSet = [unvalidatedUsername, unvalidatedPassword];
        this.checkUserInputFilled(unvalidatedUserInputSet);
    }

    formValidationCreate = (inputtedUser) => {
        (inputtedUser.userName === '') || 
        (inputtedUser.userEmail === '') || 
        (inputtedUser.userPassword === '') ||
        (inputtedUser.userFullName === '') ||
        (inputtedUser.userDOB === '') ? alert("Please fill out entire form"): console.log("youre good bruh");
    }

    handleCreateAccountClick = () => {  
        let inputtedUser = {
            userName: document.getElementById('userNameInput').value,
            userEmail:document.getElementById('userEmailInput').value,
            userPassword:document.getElementById('userPasswordInput').value,
            userFullName:document.getElementById('userFullNameInput').value,
            userDOB:document.getElementById('userDOBInput').value
        };
        console.log(inputtedUser);
        this.formValidationCreate(inputtedUser);        

        API.checkUsernameExists().then((results) =>    {
            results.data.includes(inputtedUser.userName) ? alert("We're sorry but that username is unavailable, please select another.") 
            : this.saveUserToDbAndBeginZoomEnrollment(inputtedUser);
        }); 
    }
    
    render()    {
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