import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import "./SignForm.css";
import firebaseConfig from './../firebaseConfig.js';

import EmailBlacklist from "./BLACKLIST.json";

export default function SignUpForm({ signUp, codeGen, ...props }) {
  const query = new URLSearchParams(useLocation().search);

  const BLACKLIST = EmailBlacklist.blacklist;

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.getElementById("signUpConfirmPassword").setCustomValidity(
      password === confirm ?
        ""
        :
        "Passwords Do not Match!"
    );
  }, [password, confirm])

  useEffect(() => {
    document.getElementById("signUpEmailAddress").setCustomValidity(
      BLACKLIST.includes(email.split("@")[1]) ?
        "Possible Temporary Email Detected"
        :
        ""
    )
  }, [email])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = await codeGen(document.getElementById("signUpFirstName").value);

    signUp(
      document.getElementById("signUpEmailAddress").value,
      document.getElementById("signUpPassword").value,
      (auth) => {
        firebaseConfig.database().ref(`users/${auth.user.uid}`).update(
          {
            firstName: document.getElementById("signUpFirstName").value,
            lastName: document.getElementById("signUpLastName").value,
            emailAddress: document.getElementById("signUpEmailAddress").value,
            refereeCode: document.getElementById("refereeCode").value,
            referralCode: code,
            points: 0,
            has_shared: {
              facebook: false,
              twitter: false,
              email: false
            }
          }
        );

        props.history.replace("/signup", "/dashboard");
      }
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
              id="signUpFirstName"
              type="text"
              placeholder="First name" />

            <Form.Control
              id="signUpLastName"
              type="text"
              placeholder="Last name" />
          </InputGroup>

          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              id="signUpEmailAddress"
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
              id="signUpPassword"
              type="password"
              onChange={e => setPassword(e.target.value)}
              placeholder="Password" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              id="signUpConfirmPassword"
              type="password"
              onChange={e => setConfirm(e.target.value)}
              placeholder="Password" />
          </Form.Group>

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
