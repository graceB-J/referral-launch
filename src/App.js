import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import TopBar from "./TopBar";
import About from "./about/About.js";
import ProfilePage from "./profile/ProfilePage";
import SignInForm from "./auth/SignInForm.js";
import SignUpForm from "./auth/SignUpForm.js";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import firebase, { auth, provider } from './firebaseConfig.js';
import User from './User.js'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }


  componentDidMount = () => {
    // 'onAuthStateChanged' is a method we import from
    // the 'auth' module that allows the Firebase database
    // to check if the user was already previously authenticated
    // everytime the browser refreshes, thus making sure the
    // user is not forcefully logged out
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user
        });
      }
    });
  }

  logout = () => {
    // 'signOut' is a function from the 'auth' module
    // that we imported from Firebase. Set the user's value
    // back to null
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }

  login = () => {
    // 'signInWithPopup' is a function from the 'auth' module
    // that we imported from Firebase. The parameter 'provider' is
    // the provider we enabled for our database (Google)
    auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      this.setState({
        user
      });
    });
  }

  render() {
    const {user} = this.state;

    return (
      <Router>
        <div className="App">
          <Route><TopBar user={user} logout={this.logout}/></Route>
          <ProfilePage />
          <Switch>
            <Route exact path="/signin" component={() => <SignInForm login={this.login}/>}></Route>
            <Route exact path="/signup" component={SignUpForm}></Route>
            <Route exact path="/about" component={About}></Route>
            <Route exact path="/faq"></Route>
            <Route exact path="/dashboard"></Route>
            <Route exact path="/"></Route>
          </Switch>
          <div>CONTENT</div>
        </div>
      </Router>
    )
  }
}
export default App;