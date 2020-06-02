import React, { useState } from 'react';
import './App.css';

import AccountForm from "./accountForm.js";

import firebase from "firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [account, setAccount] = useState(false);

  return (
    <Router>
      <div className="App">
        <header>
          <div className="BrandMarker">
            <div>Company Name</div>
            <img alt="Company Logo" />
          </div>
          <div className="SignInDisplay">
            {
              account ?
                <div>
                </div>
                :
                <div>
                  <button onClick={() => setAccount({ appmode: "Account", create: false })}>Sign in </button>
                  <button onClick={() => setAccount({ appmode: "Account", create: true })}>Create Account</button>
                </div>
            }

          </div>

        </header>
        <Switch>
          <Route exact path="/signin"></Route>
          <Route exact path="/about"></Route>
          <Route exact path="/faq"></Route>
          <Route exact path="/dashboard"></Route>
          <Route exact path="/"></Route>
        </Switch>
        <div>CONTENT</div>


        {
          account.appmode &&
          <AccountForm
            Methods={{
              Close: () => setAccount(false)
            }}
            Data={{
              Create: account.create
            }} />
        }
      </div>
    </Router>
  );
}

export default App;
