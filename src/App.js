import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import firebase, { auth, provider } from './firebaseConfig.js';

import TopBar from "./TopBar";
import About from "./about/About.js";
import SignInForm from "./auth/SignInForm.js";
import SignUpForm from "./auth/SignUpForm.js";
import Dashboard from './Dashboard.js';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  signUp = (email, password) => {
    auth.createUserWithEmailAndPassword(email, password);
  }

  signIn = (email, password) => {

    auth.signInWithEmailAndPassword(email, password);
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
              render={props => <SignInForm {...props} hasAccount={"TEST"} signIn={this.signIn} />}
            />
            <Route
              exact path="/signup"
              component={() => { return (<SignUpForm signUp={this.signUp} />) }}
            />
            <Route exact path="/about" component={About} />
            <Route exact path="/faq" />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/" />
          </Switch>
        </div>
      </Router>
    )
  }
}
export default App;