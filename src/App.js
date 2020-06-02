import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import firebase from "firebase";

import TopBar from "./TopBar";
import About from "./About.js";
import ProfilePage from "./ProfilePage";
import SignInForm from "./SignInForm.js";
import SignUpForm from "./SignUpForm.js";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [account, setAccount] = useState(false);

  return (
    <Router>
      <div className="App">
        <Route><TopBar /></Route>
        <ProfilePage />
        <Switch>
          <Route exact path="/signin"> </Route>
          <Route exact path="/about" component={About}></Route>
          <Route exact path="/faq"></Route>
          <Route exact path="/dashboard"></Route>
          <Route exact path="/"></Route>
        </Switch>
        <div>CONTENT</div>
      </div>
    </Router>
  );
}

export default App;