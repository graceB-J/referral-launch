import React from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./SignForm.css";
import firebase from "../firebaseConfig";

export default function SignInForm(props) {
  const addPoints = (refererCode) => {
    firebase.database().ref(`users`).once("value").then((snapshot) => {
      const data = snapshot.val() ?? {};
      let referer = "";
      let theirPoints = 0;
      Object.keys(data).forEach((uid) => {
        if (refererCode === data[uid].referralCode) {
          referer = uid;
          theirPoints = data[uid].points
        }
      });
      if (referer !== "" && referer !== 0) {
        firebase.database().ref(`users/${referer}`).update({ points: theirPoints + 1 });
      }
    });
  }

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
              (auth) => {
                props.history.replace("/signin", "dashboard");
                if (auth.user.emailVerified) {
                  firebase.database().ref(`users/${auth.user.uid}`).once("value").then((snapshot) => {
                    const data = snapshot.val();
                    if ( data !== null && data.gavePoints === false ) {
                      addPoints(data.refererCode);
                      firebase.database().ref(`users/${auth.user.uid}`).update({gavePoints: true});
                    }
                  });
                }
              }
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
