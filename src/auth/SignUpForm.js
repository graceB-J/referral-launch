import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import "./SignForm.css";
import firebase from './../firebaseConfig';

import { blacklist } from "./BLACKLIST.json";

export default function SignUpForm({ signUp, ...props }) {
  const query = new URLSearchParams(useLocation().search);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.getElementById("signUpConfirmPassword").setCustomValidity(
      password === confirm
        ? ""
        : "Passwords Do not Match!"
    );
  }, [password, confirm])

  useEffect(() => {
    document.getElementById("signUpEmailAddress").setCustomValidity(
      blacklist.includes(email.split("@")[1]) ?
        "Possible Temporary Email Detected"
        :
        ""
    )
  }, [email])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const userCode = await GenerateReferralCode(document.getElementById("signUpFirstName").value);
    const referredCode = document.getElementById("refereeCode").value;

    signUp(
      document.getElementById("signUpEmailAddress").value,
      document.getElementById("signUpPassword").value,
      (auth) => {
        addPoints(referredCode);
        firebase.database().ref(`users/${auth.user.uid}`).update(
          {
            firstName: document.getElementById("signUpFirstName").value,
            lastName: document.getElementById("signUpLastName").value,
            emailAddress: document.getElementById("signUpEmailAddress").value,
            referralCode: userCode,
            points: 0,
            admin: referredCode === "AdminCode10",
            hasShared: {
              facebook: false,
              twitter: false,
              email: false
            },
            receivedAward: [false, false, false, false]
          }
        );

        props.history.replace("/signup", "/dashboard");
      }
    );
  };

  const GenerateReferralCode = async (fname) => {
    let name = fname.toLowerCase() + Math.floor(Math.random() * 10);
    return await firebase.database().ref(`users`).once("value").then((snapshot) => {
      const data = snapshot.val() ?? {};
      const allCodes = Object.values(data).map((userData) => userData.referralCode);
      while (allCodes.includes(name)) {
        name += Math.floor(Math.random() * 10);
      }
      return name;
    });
  }

  const addPoints = (referrerCode) => {
    firebase.database().ref(`users`).once("value").then((snapshot) => {
      const data = snapshot.val() ?? {};
      let referrer = 0;
      let theirPoints = 0;
      Object.keys(data).forEach((uid) => {
        if (referrerCode === data[uid].referralCode) {
          referrer = uid;
          theirPoints = data[uid].points
        }
      });
      firebase.database().ref(`users/${referrer}`).update({ points: theirPoints + 1 });
    });
  }

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
              minlength="6"
              onChange={e => setPassword(e.target.value)}
              placeholder="Password" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              id="signUpConfirmPassword"
              type="password"
              minlength="6"
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
