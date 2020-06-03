import React, { useState, useEffect } from 'react';

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
    <div>
      <section>
        <form onSubmit={(e) => {
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
      </section>
      <section>
        <div>
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
          </ul>
        </div>
      </section>
      <MilestonesDisplay />
    </div>
  )
}
export default Dashboard;
