import React, { Component } from 'react';
import firebaseConfig from './firebaseConfig.js';

class Dashboard extends Component {
    state = {
        username: "",
        referralCode: "",
        totalReferrals: 0,
        users: []
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        const dataRef = firebaseConfig.database().ref('users');
        const referrals = {
            username: this.state.username,
            referralCode: this.state.referralCode,
            totalReferrals: this.state.totalReferrals
        }
        dataRef.push(referrals);
        this.setState({
            username: "",
            referralCode: "",
            totalReferrals: 0


        });

        console.log(this.state.username);
        console.log(this.state.referralCode);
        console.log(this.state.totalReferrals);
    }

    componentDidMount = () => {
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
            this.setState({
                users: newState
            });
        });
    }

    removeUser(itemId) {
        const useRef = firebaseConfig.database().ref(`/users/${itemId}`);
        useRef.remove(); //Make this one line
    }

    render() {
        return (
            <div>
                <section>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="username" placeholder="Name" onChange={this.handleChange} value={this.state.username} />
                        <input type="text" name="referralCode" placeholder="Referral Code" onChange={this.handleChange} value={this.state.referralCode} />
                        <input type="text" name="totalReferrals" placeholder="Total Referrals" onChange={this.handleChange} value={this.state.totalReferrals} />

                        <button> Submit Information </button>
                    </form>
                </section>
                <section>
                    <div>
                        <ul>
                            {this.state.users.map((refer) => {
                                return (
                                    <li key={refer.id}>
                                        <h3>{refer.username}</h3>
                                        <p>referralcode: {refer.referralCode}</p><br />
                                        <p>Number of referrals: {refer.totalReferrals}</p>
                                        <button onClick={() => this.removeUser(refer.id)}>Remove User</button>

                                    </li>
                                )

                            })}
                        </ul>
                    </div>
                </section>

            </div>
        )
    }

}
export default Dashboard;
