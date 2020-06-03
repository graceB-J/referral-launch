import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from "react-router-dom";
import firebase, { auth, provider } from './firebaseConfig.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import TopBar from "./TopBar";
import About from "./about/About.js";
import FAQ from "./about/FAQ.js";
import SignInForm from "./auth/SignInForm.js";
import SignUpForm from "./auth/SignUpForm.js";
import Dashboard from './profile/Dashboard.js';

import Landing from './Landing.js';

import { TwitterShareButton } from 'react-share';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      ids: []
    }
  }

  componentDidMount = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user
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
      .then(callback)
  }

  signIn = (email, password, callback) => {
    auth.signInWithEmailAndPassword(email, password)
      .then(callback)
  }

  GenerateReferralCode = (userName) => {
    let name = userName.split(" ")[0].toLowerCase();

    name += Math.floor(Math.random() * 1000);

    while (this.state.ids.includes(name)) {
      name += Math.floor(Math.random() * 10);
    }

    this.state.user.id = name;

    this.setState({
      user: this.state.user,
      ids: [...this.state.ids, name]
    })
  }

  render() {
    console.log(this.state.ids);

    return (
      <Router>
        <div className="App">
          <TopBar user={this.state.user} logout={this.logout} />
          <Switch>
            <Route
              exact path="/signin"
              render={props => this.state.user ?
                <Redirect {...props} to={{ pathname: "/dashboard" }} />
                :
                <SignInForm {...props} signIn={this.signIn} />}
            />
            <Route
              exact path="/signup"
              render={props => this.state.user ?
                <Redirect {...props} to={{ pathname: "/dashboard" }} />
                :
                <SignUpForm {...props} signUp={this.signUp} codeGen={this.GenerateReferralCode} />}
            />
            <Route exact path="/about" component={About} />
            <Route exact path="/faq" component={FAQ} />
            <Route
              exact path="/dashboard"
              render={props => this.state.user ?
                <Dashboard {...props} user={this.state.user} />
                :
                <Redirect {...props} to={{ pathname: "/signin" }} />
              }
            />
            <Route exact path="/" component={Landing} />
          </Switch>

        </div>
      </Router>
    )
  }
}

export default App;