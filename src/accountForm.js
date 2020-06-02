import React, { useState } from "react";
import "./accountForm.css";

function AccountForm(props) {
    const [createAccount, setMode] = useState(props.Data.Create);

    return (
        <div className="AccountForm">
            <form>
                <button
                    className="CloseButton"
                    onClick={props.Methods.Close
                    }>Close</button>

                <div className="AccountFormHeader">
                    <button type="button" onClick={() => setMode(false)}>Sign In</button>
                    <button type="button" onClick={() => setMode(true)}>Create Account</button>
                </div>

                <div className="AccountFormInput">
                    <div>
                        <input type="Text" placeholder="Name" />
                    </div>
                    <div>
                        <input type="Email" placeholder="Email" />
                    </div>
                    <div>
                        <input type="Password" placeholder="Password" />
                    </div>
                    <div>
                        {
                            createAccount &&
                            <input type="Password" placeholder="Confirm Password" />
                        }
                    </div>
                    <div>
                        {
                            createAccount &&
                            <input type="text" placeholder="Referral Code" />
                        }
                    </div>


                    <button type="button">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AccountForm;