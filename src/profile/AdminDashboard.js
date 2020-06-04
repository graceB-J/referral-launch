import React, { Component, useDebugValue } from "react";

import firebase from "firebase";
import Table from "react-bootstrap/Table";

export default class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            sort: "",
            filter: ""
        }
    }

    componentDidMount() {
        firebase.database().ref("users").on("value", snapshot => {
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
    }

    ValidateReward(points, reward) {
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

    SendAward = (userID, reward) => {
        return () => {
            let newAwards = [false, false, false, false]

            for (let i = 0; i < this.state.users.length; i++) {
                console.log(this.state.users[i], userID);
                if (this.state.users[i].id === userID)
                    newAwards = this.state.users[i].receivedAward;
            }

            if (newAwards === undefined)
                newAwards = [false, false, false, false]

            newAwards[reward] = "Pending";
            firebase.database().ref(`users/${userID}`).update({ receivedAward: newAwards })
        }
    }

    getSort = () => {
        if (this.state.sort === "FName") {
            return ((a, b) => {
                if (a.firstName.toLowerCase() < b.firstName.toLowerCase())
                    return -1
                if (a.firstName.toLowerCase() > b.firstName.toLowerCase())
                    return 1
                return 0
            })
        }
        else if (this.state.sort === "LName") {
            return ((a, b) => {
                if (a.lastName.toLowerCase() < b.lastName.toLowerCase())
                    return -1
                if (a.lastName.toLowerCase() > b.lastName.toLowerCase())
                    return 1
                return 0
            })
        }
        else if (this.state.sort === "Points") {
            return ((a, b) => {
                if (a.points < b.points)
                    return 1
                if (a.points > b.points)
                    return -1
                return 0
            })
        }
        else {
            return ((a, b) => 0)
        }
    }
    applyFilter = (user) => {
        const key = this.state.filter;

        return user.firstName.includes(key) || user.lastName.includes(key) || user.referralCode.includes(key);
    }

    render() {
        const usersList = this.state.users.filter(this.applyFilter)
        usersList.sort(this.getSort());

        return (
            <div>
                <div className="FilterSort">
                    <select onChange={e => this.setState({ sort: e.target.value })}>
                        <option value="">(Sort Results)</option>
                        <option value="FName">First Name</option>
                        <option value="LName">Last Name</option>
                        <option value="Points">Referral Points</option>
                    </select>
                    <input onChange={e => this.setState({ filter: e.target.value })}
                        type="Text" placeholder="Search Results" />
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
                        {usersList.map(user => {
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
                                                        award
                                                        :
                                                        <button
                                                            disabled={this.ValidateReward(user.points, index)}
                                                            onClick={this.SendAward(user.id, index)}
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