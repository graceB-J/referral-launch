import React from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css"
import TopBar from "./TopBar";
import Landing from './about/Landing.js';
import About from "./about/About.js";
import FAQ from "./about/FAQ.js";
import SignInForm from "./auth/SignInForm.js";
import SignUpForm from "./auth/SignUpForm.js";
import Dashboard from './profile/Dashboard.js';

import firebase, { auth } from './firebaseConfig.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user
        });
      } else {
        this.setState({
          user: null,
        });
      }
    })
  }

  logout = () => {
    auth.signOut();
  }

  signUp = (email, password, callback) => {
    auth.createUserWithEmailAndPassword(email, password)
      .then((auth) => callback(auth))
      .then((auth) => {
        return this.doSendEmailVerification(auth.user);
      })
  }

  doSendEmailVerification = (user) => {
    console.log("sending email");
    user.sendEmailVerification();
  }

  signIn = (email, password, callback) => {
    auth.signInWithEmailAndPassword(email, password)
      .then(user => callback(user))
  }

  render() {
    return (
      <Router>
        <TopBar user={this.state.user} logout={this.logout} />
        <Switch>
          <Route
            exact path="/signin"
            render={props => this.state.user 
              ? <Redirect {...props} to={{ pathname: "/dashboard" }} />
              : <SignInForm {...props} signIn={this.signIn} />}
          />
          <Route
            exact path="/signup"
            render={props => this.state.user
              ? <Redirect {...props} to={{ pathname: "/dashboard" }} />
              : <SignUpForm {...props} signUp={this.signUp} />}
          />
          <Route exact path="/about" component={About} />
          <Route exact path="/faq" component={FAQ} />
          <Route
            exact path="/dashboard"
            render={props => this.state.user
              ? <Dashboard {...props} user={this.state.user} />
              : <Redirect {...props} to={{ pathname: "/signin" }} />
            }
          />
          <Route exact path="/" component={Landing} />
        </Switch>
      </Router>
    )
  }
}

export default App;