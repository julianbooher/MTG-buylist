import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import './LandingPage.css';


export default function LandingPage() {
  // fetch greeting info from database

  const history = useHistory();


  // mapping over greeting data and displaying
  return (

    <Container>
      <center>
        <h2>Landing Page</h2>
        <br></br>
        <Button
          className="landing-registration-button"
          variant='primary'
          type="button"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Create a Profile
        </Button>
        <h4>Already a Member?</h4>
        <Button
          variant='primary'
          type="button"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
      </center>

    </Container>


  );
}



