import React, { useState, useEffect } from 'react';

import Container from "react-bootstrap/Container"
import Jumbotron from "react-bootstrap/Jumbotron"
import Button from "react-bootstrap/Button"

import { FaTwitter, FaFacebookF } from 'react-icons/fa';

import firebase from './../firebaseConfig';
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
      <Jumbotron>
        <h3>Your Referral Code</h3>
        <h1>{userInfo.referralCode}</h1>
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
        >
          copy a link to send to your friends!
        </Button>
      </Jumbotron>
      <Jumbotron>
        <h3>Your Points</h3>
        <h1>{userInfo.points + Object.values(hasShared).reduce((a, b) => (a + b), 0)}</h1>
        <h5>Share us on Twitter and Facebook for extra points</h5>
      </Jumbotron>
      <MilestonesDisplay />
    </Container>
  )
}
export default Dashboard;
