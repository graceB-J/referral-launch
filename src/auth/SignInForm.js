import React from "react";

import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import "./SignForm.css";

export default function SignInForm({ signIn }) {
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <h1>Sign In</h1>
        <hr />
        <Form>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Name</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control id="SignInFirstName"
              type="text"
              placeholder="First name" />
            <Form.Control id="SignInLastName"
              type="text"
              placeholder="Last name" />
          </InputGroup>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control id="SignInEmail"
              type="email"
              placeholder="Enter email" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control id="SignInPassword"
              type="password"
              placeholder="Password" />
          </Form.Group>
          <Button variant="primary" onClick={() => {
            signIn(
              document.getElementById("SignInEmail").value,
              document.getElementById("SignInPassword").value
            )
            console.log(
              document.getElementById("SignInFirstName").value,
              document.getElementById("SignInLastName").value,
              document.getElementById("SignInEmail").value,
              document.getElementById("SignInPassword").value
            );
          }}>
            Submit
          </Button>
          <p>No account? <Link to="/signup">Click here to sign up.</Link></p>
        </Form>
      </div>
    </div >
  )
}
