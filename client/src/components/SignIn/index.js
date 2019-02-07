import React from "react";
// import "./style.css";
import Form from 'react-bootstrap/Form';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';

function SignIn(props) {
    return (
        <div>
             {/* <ul class="slideshow">
                <li></li><li></li><li></li><li></li><li></li>
                <li></li><li></li><li></li><li></li><li></li>
                <li></li><li></li><li></li><li></li><li></li>
                <li></li><li></li><li></li><li></li><li></li>
                <li></li><li></li><li></li><li></li><li></li>
            </ul> */}
            <Form className='signup-form'> 
                
                <Form.Group controlId="formBasicEmail"> 
                    <Form.Control type="email" placeholder="Username or Email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                
                <ButtonToolbar>
                    <Button variant="dark" onClick={(event) =>  {
                        event.preventDefault();
                        return props.handleClick();
                    }}>Sign In</Button>
                    <Button variant="dark" href='/SignUp'>Create An Account</Button>
                </ButtonToolbar>
            </Form>
        </div>
    )
}

export default SignIn;