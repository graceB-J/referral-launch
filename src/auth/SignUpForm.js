import React from "react";
import "./SignForm.css";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

const SignUpForm = (props) => {
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
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Referral Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Code" />
          </Form.Group>
          <Button variant="primary">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default SignUpForm;