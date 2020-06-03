import React, { FC, ChangeEvent, FormEvent, useState } from "react";

import { useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import "./SignForm.css";
import firebaseConfig from './../firebaseConfig.js';

export default function SignUpForm({ signUp, ...props }) {
  const query = new URLSearchParams(useLocation().search);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataRef = firebaseConfig.database().ref('users');
    let result = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      emailAddress: document.getElementById("emailAddress").value,
      password: document.getElementById("password").value,
      referralCode: document.getElementById("referralCode").value,
    };
    dataRef.push(result);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <h1>Sign Up</h1>

        {/* The entire form */}
        <Form onSubmit={handleSubmit}>

          {/*  Form section for NAME */}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Name</InputGroup.Text>
            </InputGroup.Prepend>

            <Form.Control
              id="firstName"
              type="text"
              placeholder="First name" />

            <Form.Control 
              id="lastName"
              type="text"
              placeholder="Last name" />
          </InputGroup>

          {/* Form section for EMAIL ADDRESS */}
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              id="emailAddress"
              type="email"
              placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          {/* Form section for PASSWORD */}
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="password"
              type="password"
              placeholder="Password" />
          </Form.Group>

          {/* Form section for CONFIRM PASSWORD */}
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
              id="confirmPassword"
              type="password"
              placeholder="Password" />
          </Form.Group>

          {/* Form section for REFERRAL CODE */}
          <Form.Group>
            <Form.Label>Referral Code</Form.Label>
            <Form.Control 
              id="referralCode"
              type="text"
              placeholder="Code"
              value={query.get("ref")} />
          </Form.Group>
          <Button variant="primary" type='submit'
            onClick={() => {
              signUp(
                document.getElementById("emailAddress").value,
                document.getElementById("password").value,
                () => props.history.replace("/signup", "/dashboard")
              );
            }}>
            Submit
          </Button>
        </Form>
      </div>
    </div >
  )
}
