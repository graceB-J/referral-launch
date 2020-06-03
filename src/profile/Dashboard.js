import React, { useState, useEffect } from 'react';

import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

import { FaTwitter, FaFacebookF } from 'react-icons/fa';

import firebaseConfig from './../firebaseConfig.js';
import MilestonesDisplay from "./MilestonesDisplay";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState({username: "", referralCode: "", totalReferrals: ""});
  const [users, setUsers] = useState([]);

  const handleChange = (target) => {
    setUserInfo((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  }

  const handleSubmit = (target) => {
    const dataRef = firebaseConfig.database().ref('users');
    const referrals = {
      username: userInfo.username,
      referralCode: userInfo.referralCode,
      totalReferrals: userInfo.totalReferrals
    }
    dataRef.push(referrals);

    setUserInfo({username: "", referralCode: "", totalReferrals: ""});
  }

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

  const removeUser = (itemId) => {
    const userRef = firebaseConfig.database().ref(`/users/${itemId}`);
    userRef.remove();
  }

  return (
    <Container>
      {/* <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e.target);
      }}>
        <input
          type="text"
          name="username"
          placeholder="Name"
          onChange={(e) => handleChange(e.target)}
          value={userInfo.username} />
        <input
          type="text"
          name="referralCode"
          placeholder="Referral Code"
          onChange={(e) => handleChange(e.target)}
          value={userInfo.referralCode} />
        <input
          type="text"
          name="totalReferrals"
          placeholder="Total Referrals"
          onChange={(e) => handleChange(e.target)}
          value={userInfo.totalReferrals} />
        <button> Submit Information </button>
      </form>
      <ul>
        {users.map((refer) => {
          return (
            <li key={refer.id}>
              <h3>{refer.username}</h3>
              <p>referralcode: {refer.referralCode}</p><br />
              <p>Number of referrals: {refer.totalReferrals}</p>
              <button onClick={() => removeUser(refer.id)}>Remove User</button>
            </li>
          )
        })}
      </ul> */}
      <h3>Your Referral Code</h3>
      <h1>kyungjin15</h1>
      <Button
        variant="primary"
        onClick={() => {
          const url = window.location.href.split("dashboard");
          const referralLink = url[0].concat("signin?ref=REFERRALCODEHERE");
          navigator.clipboard.writeText(referralLink);
        }}
      >
        copy a link to send to your friends!
      </Button>
      <h3>Your Points</h3>
      <h1>3</h1>
      <h3>Share us on Twitter and Facebook for extra points</h3>
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
      <MilestonesDisplay />
    </Container>
  )
}
export default Dashboard;
