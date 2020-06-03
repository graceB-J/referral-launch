import React, { FC, ChangeEvent, FormEvent, useState } from "react";

import { useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import "./SignForm.css";
import firebaseConfig from './../firebaseConfig.js';

export default function SignUpForm({ signUp, codeGen, ...props }) {
  const query = new URLSearchParams(useLocation().search);

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp( 
      document.getElementById("emailAddress").value,
      document.getElementById("password").value,
      (auth) => {
        const dataRef = firebaseConfig.database().ref(`users/${auth.user.uid}`);
        let result = {
          firstName: document.getElementById("firstName").value,
          lastName: document.getElementById("lastName").value,
          emailAddress: document.getElementById("emailAddress").value,
          refereeCode: document.getElementById("refereeCode").value,
          referralCode: codeGen(document.getElementById("firstName").value),
        };
        dataRef.update(result);
        //redirect
        props.history.replace("/signup", "/dashboard");
      }
    );
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
              id="refereeCode"
              type="text"
              placeholder="Code"
              value={query.get("ref")} />
          </Form.Group>
          <Button variant="primary" type='submit'>
            Submit
          </Button>
        </Form>
      </div>
    </div >
  )
}
