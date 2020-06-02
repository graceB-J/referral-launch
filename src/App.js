import React from 'react';
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
  }

  componentDidMount = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user
        });
      }
    });
  }

  logout = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  login = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <TopBar user={this.state.user} logout={this.logout} />
          <Switch>
            <Route
              exact
              path="/signin"
              render={props => <SignInForm {...props} hasAccount={"TEST"} login={this.login} />}
            />
            <Route exact path="/signup" component={SignUpForm} />
            <Route exact path="/about" component={About} />
            <Route exact path="/faq" />
            <Route exact path="/dashboard" component={ProfilePage} />
            <Route exact path="/" />
          </Switch>
        </div>
      </Router>
    )
  }
}
export default App;