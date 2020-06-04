import React, { useState, Component } from "react";

import firebase from "firebase";
import Table from "react-bootstrap/Table";

export default class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [] }
    }

    componentDidMount() {
        firebase.database().ref("users").once("value", snapshot => {
            const keys = Object.keys(snapshot.val())
            let index = 0;
            let usersArr = []
            Object.values(snapshot.val()).map(user => {
                user.id = keys[index++];
                usersArr.push(user)
            })
            this.setState({
                users: usersArr
            });
        })
        firebase.database().ref("users").on("value", snapshot => {
            this.setState({
                users: Object.values(snapshot.val())
            });
        })
    }

    ValidateReward(points, reward) {
        console.log(points, reward)
        switch (reward) {
            case 0:
                return points < 10
            case 1:
                return points < 25
            case 2:
                return points < 50
            default:
                return points < 100
        }
    }

    SendAWard(userID, reward) {
        console.log(userID, reward);
        //firebase.database().ref(`users/${user}`) set rewards
    }

    render() {
        return (
            <div>
                <div className="FilterSort">
                    <select>
                        <option value="">(Sort Results)</option>
                        <option value="FName">First Name</option>
                        <option value="LName">Last Name</option>
                        <option value="Points">Referral Points</option>
                        <option value="">(Sort Results)</option>
                    </select>
                    <input type="Text" placeholder="Search Results" />
                </div>


                <Table hover responsive >
                    <thead>
                        <tr>
                            <th colSpan="2">User Name</th>
                            <th>User Email</th>
                            <th>User Referral Code</th>
                            <th>User points</th>
                            <th colSpan="4">Received Awards</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map(user => {
                            let index = -1;
                            if (!user.receivedAward)
                                user.receivedAward = [false, false, false, false]
                            return (
                                <tr>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.emailAddress}</td>
                                    <td>{user.referralCode}</td>
                                    <td>{user.points}</td>
                                    {user.receivedAward.map(award => {
                                        index++;
                                        return (
                                            <td>
                                                {
                                                    award ?
                                                        "Received"
                                                        :
                                                        <button
                                                            disabled={this.ValidateReward(user.points, index)}
                                                            onClick={() => { this.SendAWard(user.id, index) }}
                                                        >Give Award</button>
                                                }
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div >
        )
    }
}