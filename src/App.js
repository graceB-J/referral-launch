import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import TopBar from "./TopBar";
import About from "./About.js";
import ProfilePage from "./ProfilePage";
import SignInForm from "./SignInForm.js";
import SignUpForm from "./SignUpForm.js";

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
          <div className="wrapper">
            {this.state.user ?
              <button onClick={this.logout} id='logout'>Log Out</button>
              :
              <button onClick={this.login} id='login'>Login</button>
            }

          </div>

          {this.state.user ?
            <div>
              <h1 id='loginTitle'>Welcome</h1>
              <p> <User /> </p>
            </div>
            :
            <div className='wrapper'>
              <h1 id='centerTitle'> Please login </h1>
            </div>
          }

          <TopBar />
          <Switch>
            <Route
              exact
              path="/signin"
              render={props => <SignInForm {...props} hasAccount={"TEST"} />}
            />
            <Route exact path="/signup" component={props => SignUpForm} />
            <Route exact path="/about" component={props => About} />
            <Route exact path="/faq" />
            <Route exact path="/dashboard" component={props => ProfilePage} />
            <Route exact path="/" />
          </Switch>
        </div>
      </Router>
    )
  }
}
export default App;