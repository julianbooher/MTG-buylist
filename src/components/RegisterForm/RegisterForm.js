import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RegisterForm.css'
import {Form, Container, Button} from 'react-bootstrap';


export default function RegisterForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const registrationMessage = useSelector(state => state.errors.registrationMessage);


  const registerUser = (event) => {
    event.preventDefault();
    if (password !== passwordConfirm){
      dispatch({type: 'PASSWORD_DOES_NOT_MATCH'})
    } else if (username && password && passwordConfirm){
      dispatch({
        type: 'REGISTER',
        payload: {
          username: username,
          password: password,
        },
      });
    } 
  }; // end registerUser


    return (
     <Container style={{backgroundColor: 'aliceblue', margin: 'auto'}}>
      <Form className="register-form" onSubmit={event => {registerUser(event)}}>
        <h2>Register Organization</h2>
          {registrationMessage && (
          <h3 className="alert" role="alert">
            {registrationMessage}
          </h3>
        )}
        <Form.Group>
          <Form.Label htmlFor="username">
            Email
            <br></br>
          </Form.Label>
          <Form.Control
            className="register"
            type="text"
            name="username"
            value={username}
            required
            onChange={event => setUsername(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">
            Password
            <br></br>
          </Form.Label>
            <Form.Control
              className="register"
              type="password"
              name="password"
              value={password}
              required
              onChange={event => setPassword(event.target.value)}
            />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="passwordConfirm">
            Confirm Password
            <br></br>
          </Form.Label>
          <Form.Control
            className="register confirm"
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            style={{
              border: password === passwordConfirm && passwordConfirm ?
              'green 1px solid'
              :
              'red 1px solid'
            }}
            required
            onChange={event => setPasswordConfirm(event.target.value)}
          />
        </Form.Group>
        
        <Form.Group style={{textAlign: 'center'}}>
          <Button 
            className="btn" 
            type="submit" 
            name="submit" 
          >
            Register
          </Button>
        </Form.Group>
      </Form>
      </Container>
    );
  }
