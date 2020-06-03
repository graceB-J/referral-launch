import React from "react";
import "./SignForm.css";

import { useLocation } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

export default function SignUpForm(props, { signUp }) {
  const query = new URLSearchParams(useLocation().search);

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <h1>Sign Up</h1>
        <Form>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Name</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              id="SignUpFirstName"
              type="text"
              placeholder="First name" />
            <Form.Control id="SignUpLastName"
              type="text"
              placeholder="Last name" />
          </InputGroup>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              id="SignUpUserEmail"
              type="email"
              placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="SignUpUserPassword"
              type="password"
              placeholder="Password" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control id="SignUpConfirmPassword"
              type="password"
              placeholder="Password" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Referral Code</Form.Label>
            <Form.Control id="SignUpReferral"
              type="text"
              placeholder="Code"
              value={query.get("ref")} />
          </Form.Group>

          <Button variant="primary"
            onClick={() => {
              signUp(
                document.getElementById("SignUpUserEmail").value,
                document.getElementById("SignUpUserPassword").value,
                () => props.history.replace("/signpup", "/dashboard")
              );
              console.log(
                document.getElementById("SignUpFirstName").value,
                document.getElementById("SignUpLastName").value,
                document.getElementById("SignUpUserEmail").value,
                document.getElementById("SignUpUserPassword").value,
                document.getElementById("SignUpConfirmPassword").value,
                document.getElementById("SignUpUserEmail").value
              )
            }}>
            Submit
          </Button>
        </Form>
      </div>
    </div >
  )
}
