import React, { useState } from 'react';
import './App.css';

import AccountForm from "./accountForm.js";

function App() {
  const [account, setAccount] = useState(false);

  return (
    <div className="App">
      <header>
        <div>Company Name</div>
        <button onClick={() => setAccount("SignIn")}>Sign in </button>
        <button onClick={() => setAccount("CreateAccount")}>Create Account</button>
      </header>
      <div>CONTENT</div>

      {
        account === "SignIn" &&
        <AccountForm />
      }
      {
        account === "CreateAccount" &&
        <AccountForm />
      }
    </div>
  );
}

export default App;
