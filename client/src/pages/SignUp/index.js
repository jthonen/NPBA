import React, { Component } from "react";
import API from '../../utils/API';
import SignUp from "../../components/SignUp";

class Signup extends Component {
    
    handleClick = (event) => {
        event.preventDefault();
        
        let user = {
            userName: document.getElementById('userName').value,
            userEmail:document.getElementById('userEmail').value,
            userPassword:document.getElementById('userPassword').value,
            userFirstName:document.getElementById('userFirstName').value,
            userLastName:document.getElementById('userLastName').value,
            userDOB:document.getElementById('userDOB').value
        };
        console.log(user);
        this.sendNewUser(user);
    }

    sendNewUser = (user) => {
        return API.signUp(user);
    }

    render() {
        return (
            <SignUp
            handleClick={this.handleClick} />
        );
    }
}

export default Signup;