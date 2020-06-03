import React from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./SignForm.css";

export default function SignInForm(props) {
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <h1>Sign In</h1>
        <hr />
        <Form>
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
          <Button variant="primary" onClick={() =>
            props.signIn(
              document.getElementById("SignInEmail").value,
              document.getElementById("SignInPassword").value,
              () => props.history.replace("/signin", "dashboard")
            )
          }>
            Submit
          </Button>
          <p>No account? <Link to="/signup">Click here to sign up.</Link></p>
        </Form>
      </div>
    </div >
  )
}
