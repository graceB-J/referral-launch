import React, { useState, useEffect } from 'react';

import Container from "react-bootstrap/Container"
import Jumbotron from "react-bootstrap/Jumbotron"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"

import { FaTwitter, FaFacebookF } from 'react-icons/fa';

import "./Dashboard.css";
import firebase, {auth} from './../firebaseConfig';
import MilestonesDisplay from "./MilestonesDisplay";
import SocialMediaButton from './TwitterButton.js';

const Dashboard = ({ user }) => {
  const [{ hasShared, ...userInfo }, setUserInfo] = useState({ hasShared: {} });

  useEffect(() => {
    // Firebase 'on' function and set state for total referrals
    firebase.database().ref(`users/${user.uid}`).on("value", (snapshot) => {
      var changedUserInfo = snapshot.val();
      setUserInfo(changedUserInfo);
    });
  }, []);

  return (
    <Container>
      {!auth.currentUser.emailVerified &&
        <Alert variant="danger">
          Your email is not emailVerified
        </Alert>}
      <Jumbotron className="dashboard-box">
        <h3>Your Referral Code</h3>
        <h2 className="dash-beeg-display">{userInfo.referralCode}</h2>
        <h5 className="pls-share">If people, sign up with your referral code, you get rewarded!</h5>
        <h5 className="pls-share">Share your code via. Twitter, Facebook, or Link</h5>
        <SocialMediaButton
          url={window.location.href.split("dashboard")[0].concat(`signup?ref=${userInfo.referralCode}`)}
          text="Check it out!" />
        <Button
          variant="primary"
          onClick={() => {
            const url = window.location.href.split("dashboard");
            const referralLink = url[0].concat(`signup?ref=${userInfo.referralCode}`);
            navigator.clipboard.writeText(referralLink);
          }}
          style={{marginTop: "5px"}}
        >
          copy a link to send to your friends!
        </Button>
      </Jumbotron>
      <Jumbotron className="dashboard-box">
        <h2 className="dash-beeg-display">{userInfo.points + Object.values(hasShared).reduce((a, b) => (a + b), 0)}</h2>
        <h3>Your Points</h3>
        <h5 className="pls-share">Share us on Twitter and Facebook for extra points</h5>
      </Jumbotron>
      <Jumbotron className="dashboard-box">
        <MilestonesDisplay />
      </Jumbotron>
    </Container>
  )
}
export default Dashboard;
