import React, { useState, useEffect } from 'react';

import Container from "react-bootstrap/Container"
import Jumbotron from "react-bootstrap/Jumbotron"
import Button from "react-bootstrap/Button"

import { FaTwitter, FaFacebookF } from 'react-icons/fa';

import firebaseConfig from './../firebaseConfig.js';

import MilestonesDisplay from "./MilestonesDisplay";

import SocialMediaButton from '../profile/TwitterButton.js';

const Dashboard = (props) => {
  const [userInfo, setUserInfo] = useState({ username: "", referralCode: "", totalReferrals: "" });
  const [users, setUsers] = useState([]);

  // ref.on("child_changed", function (snapshot) {
  //   var changedPost = snapshot.val();
  //   console.log("The updated points is " + changedPost.totalReferrals);
  //   setUserInfo(totalReferrals + 1);
  // });

  useEffect(() => {
    const userRef = firebaseConfig.database().ref("users");
    userRef.on("value", (snapshot) => {
      let users = snapshot.val();
      let newState = [];
      for (let refer in users) {
        newState.push({
          id: refer,
          username: users[refer].username,
          referralCode: users[refer].referralCode,
          totalReferrals: users[refer].totalReferrals
        });
      }
      setUsers(newState);
    });
  }, []);

  return (
    <Container>
      <Jumbotron>
        <h3>Your Referral Code</h3>
        <h1>kyungjin15</h1>
        <SocialMediaButton url={window.location.href.split("dashboard")[0].concat("signup?ref=REFERRALCODEHERE")} text="Check it out!" />
        <Button
          variant="primary"
          onClick={() => {
            const url = window.location.href.split("dashboard");
            const referralLink = url[0].concat("signup?ref=REFERRALCODEHERE");
            navigator.clipboard.writeText(referralLink);
          }}
        >
          copy a link to send to your friends!
        </Button>
      </Jumbotron>
      <Jumbotron>
        <h3>Your Points</h3>
        {/* <h1>{firebaseConfig.database().ref('users').orderByChild('emailAddress').equalTo().child('points')}</h1> */}
        <h5>Share us on Twitter and Facebook for extra points</h5>
        <Button
          variant="primary"
          size="lg">
          <FaTwitter />
        </Button>
        <Button
          variant="primary"
          size="lg">
          <FaFacebookF />
        </Button>
      </Jumbotron>
      <MilestonesDisplay />
    </Container>
  )
}
export default Dashboard;
