import React from "react";

import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import "./SignForm.css";

const SignInForm = ({login}) => {
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <h1>Sign In</h1>
        <Button onClick={login} id='login'>Login</Button>
        <hr />
        <Form>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Name</InputGroup.Text>
          </InputGroup.Prepend>
            <Form.Control
              type="text"
              placeholder="First name" />
            <Form.Control
              type="text"
              placeholder="Last name" />
        </InputGroup>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password" />
          </Form.Group>
          <Button variant="primary">
            Submit
          </Button>
          <p>No account? <Link to="/signup">Click here to sign up.</Link></p>
        </Form>
      </div>
    </div>
  )
}

export default SignInForm;