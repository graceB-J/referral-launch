import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import firebase, { auth, provider } from './firebaseConfig.js';

import TopBar from "./TopBar";
import About from "./about/About.js";
import FAQ from "./about/FAQ.js";
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
    auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log(this.props);
        this.props.history.push("/dashboard");
      })
  }

  signIn = (email, password, formhistory) => {
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log(this.props);
        formhistory.push("/dashboard");
      })
  }

  render() {
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
                <SignUpForm {...props} signUp={this.signUp} />}
            />
            <Route exact path="/about" component={About} />
            <Route exact path="/faq" component={FAQ} />
            <Route
              exact path="/dashboard"
              render={props => this.state.user ?
                <Dashboard {...props} />
                :
                <Redirect {...props} to={{ pathname: "/signin" }} />
              }
            />
            <Route exact path="/" />
          </Switch>
        </div>
      </Router>
    )
  }
}
export default App;