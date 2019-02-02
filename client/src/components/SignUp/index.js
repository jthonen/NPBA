import React from "react";
import "./style.css";

function SignUp() {

    return (
        <div>
            <ul class="slideshow">
                <li></li><li></li><li></li><li></li><li></li>
                <li></li><li></li><li></li><li></li><li></li>
                <li></li><li></li><li></li><li></li><li></li>
                <li></li><li></li><li></li><li></li><li></li>
                <li></li><li></li><li></li><li></li><li></li>
            </ul>

            <form id="msform" action="https://www.enformed.io/gh0zckmw" method="POST">
                <fieldset>
                    <div id="main">
                        <h2 class="fs-title">Create your Admin Account</h2>
                        <div id="login">
                    
                            <h3 class="fs-subtitle">Name</h3>
                            <input type="text" name="name" id="name" required="required" placeholder="Please Enter Name"/><br /><br />
                            
                            <h3 class="fs-subtitle">Email</h3>
                            <input type="email" name="email" id="email" required="required" placeholder="john123@gmail.com"/><br/><br />
                            
                            <h3 class="fs-subtitle">Password</h3>
                            <input type="password" name="password" id="city" required="required" placeholder="Please Enter Password"/><br/><br />
            
                            <input action = "" type="submit" value="Submit" class="submit action-button" name="submit"/><br />
                        </div>
                    </div>
                </fieldset>
            </form>    
        </div>
    );
}


export default SignUp;