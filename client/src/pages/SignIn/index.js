import React, { Component } from "react";
import API from '../../utils/API';
import SignIn from "../../components/SignIn";

class Signin extends Component {
    handleClick = (event) => {
        console.log(event.target);
    }

render() {
    return (
        <SignIn 
        handleClick={this.handleClick} />
    )
}
}

export default Signin;