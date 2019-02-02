import React from "react"; 
import "./style.css";


function ButtonSelect() {
    function handleClick(e){
        e.preventDefault();
        console.log('clicked');
        window.location.href = "http://localhost:3000/SignUp";
    };
    function handleFace(e) {
        e.preventDefault();
        console.log('clicked');
        window.location.href = "http://localhost:3000/ZoOm";
    }
    return (
        <div> 
            <div>
                <ul class="slideshow">
                    <li></li><li></li><li></li><li></li><li></li>
                    <li></li><li></li><li></li><li></li><li></li>
                    <li></li><li></li><li></li><li></li><li></li>
                    <li></li><li></li><li></li><li></li><li></li>
                    <li></li><li></li><li></li><li></li><li></li>
                </ul>
            </div>
            
            <form id="msform" action="https://www.enformed.io/gh0zckmw" method="POST">
                <fieldset>
                    <div id="main">
                        <h2 className="fs-title">Login With</h2>
                        <div id="login">
                            <input onClick={handleFace}action = "" type="submit" value="Your Face" className="submit action-button" name="submit"/><br />
                            <input onClick={handleClick}action = "" type="submit" value="Your Login" className="submit action-button" name="submit"/><br />
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}

export default ButtonSelect