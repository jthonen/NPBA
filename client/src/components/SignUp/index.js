import React from "react";
import "./style.css";
import Form from 'react-bootstrap/Form';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';

function SignUp(props) {
    console.log(props);
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
                <Form.Group>
                    <Form.Control type="text" placeholder="Username" id='userName'/>    
                </Form.Group>
                <Form.Group> 
                    <Form.Control type="email" placeholder="Email Address" id='userEmail' />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" placeholder="Password" id='userPassword'/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="email" placeholder="First Name" id='userFirstName' />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="email" placeholder="Last Name" id='userLastName'/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="email" placeholder="DOB" id='userDOB' />
                    <Form.Text>Must be 21+</Form.Text>
                </Form.Group>
                <ButtonToolbar>
                    <Button variant="dark" onClick={(event) =>{
                        return props.handleClick(event);
                    }}> Sign Up</Button>
                </ButtonToolbar>
            </Form>

        </div>
    );
}

export default SignUp;