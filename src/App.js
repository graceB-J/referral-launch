import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase, { auth, provider } from './firebaseConfig.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import TopBar from "./TopBar";
import About from "./about/About.js";
import FAQ from "./about/FAQ.js";
import SignInForm from "./auth/SignInForm.js";
import SignUpForm from "./auth/SignUpForm.js";
import Dashboard from './profile/Dashboard.js';

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
          <Route exact path="/faq" component={FAQ} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/" />
        </Switch>
      </Router>
    )
  }
}

export default App;