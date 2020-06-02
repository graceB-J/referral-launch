import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import TopBar from "./TopBar";
import ProfilePage from "./ProfilePage";
import SignInForm from "./SignInForm.js";
import SignUpForm from "./SignUpForm.js";

// import firebase from "firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [account, setAccount] = useState(false);

  return (
    <Router>
      <TopBar />
      {/* <header>
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

      </header> */}
      <Switch>
        <Route exact path="/signin" component={SignInForm}></Route>
        <Route exact path="/signup" component={SignUpForm}></Route>
        <Route exact path="/about"></Route>
        <Route exact path="/faq"></Route>
        <Route exact path="/dashboard" component={ProfilePage} />
        <Route exact path="/"></Route>
      </Switch>
      {/* {
        account.appmode &&
        <AccountForm
          Methods={{
            Close: () => setAccount(false)
          }}
          Data={{
            Create: account.create
          }} />
      } */}
    </Router>
  );
}

export default App;