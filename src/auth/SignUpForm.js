import React, { FC, ChangeEvent, FormEvent, useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import axios from "axios";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import "./SignForm.css";
import firebaseConfig from './../firebaseConfig.js';

import EmailBlacklist from "./BLACKLIST.json";

// let BLACKLIST;
// axios.get(`https://raw.githubusercontent.com/andreis/disposable-email-domains/master/domains.json`)
//   .then(response => {
//     BLACKLIST = response.data;
//   })

export default function SignUpForm({ signUp, ...props }) {
  const query = new URLSearchParams(useLocation().search);

  const BLACKLIST = EmailBlacklist.blacklist;

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.getElementById("SignUpConfirmPassword").setCustomValidity(
      password === confirm ?
        ""
        :
        "Passwords Do not Match!"
    );
  }, [password, confirm])

  useEffect(() => {
    if (BLACKLIST.includes(email.split("@")[1])) {
      document.getElementById("SignUpEmailAddress").setCustomValidity("Possible Temporary Email Detected");
    }
    else {
      document.getElementById("SignUpEmailAddress").setCustomValidity("");
    }
  }, [email])


  const handleSubmit = (e) => {
    e.preventDefault();

    firebaseConfig.database().ref('users').push(
      {
        firstName: document.getElementById("SignUpFirstName").value,
        lastName: document.getElementById("SignUpLastName").value,
        emailAddress: email,
        password: document.getElementById("SignUpPassword").value,
        referralCode: document.getElementById("SignUpReferralCode").value,
      }
    );

    signUp(
      document.getElementById("SignUpEmailAddress").value,
      document.getElementById("SignUpPassword").value,
      () => props.history.replace("/signup", "/dashboard")
    );
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <h1>Sign Up</h1>

        <Form onSubmit={handleSubmit}>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Name</InputGroup.Text>
            </InputGroup.Prepend>

            <Form.Control
              id="SignUpFirstName"
              type="text"
              placeholder="First name" />

            <Form.Control
              id="SignUpLastName"
              type="text"
              placeholder="Last name" />
          </InputGroup>

          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              id="SignUpEmailAddress"
              type="email"
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="SignUpPassword"
              type="password"
              onChange={e => setPassword(e.target.value)}
              placeholder="Password" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              id="SignUpConfirmPassword"
              type="password"
              onChange={e => setConfirm(e.target.value)}
              placeholder="Password" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Referral Code</Form.Label>
            <Form.Control
              id="SignUpReferralCode"
              type="text"
              placeholder="Code"
              value={query.get("ref")} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div >
  )
}
