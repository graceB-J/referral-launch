import React, { useState } from 'react';
import './App.css';

import AccountForm from "./accountForm.js";

function App() {
  const [account, setAccount] = useState(false);

  return (
    <div className="App">
      <header>
        <div className="BrandMarker">
          <div>Company Name</div>
          <img alt="Company Logo" />
        </div>

        <button onClick={() => setAccount({ appmode: "Account", create: false })}>Sign in </button>
        <button onClick={() => setAccount({ appmode: "Account", create: true })}>Create Account</button>
      </header>
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
  );
}

export default App;
