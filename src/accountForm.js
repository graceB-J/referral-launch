import React from "react";
import "./accountForm.css";

function AccountForm(props) {
    return (
        <div className="AccountForm">
            <button>Close</button>
            <form>
                <input type="Text" placeholder="Name"></input>
                <input type="Email" placeholder="Email"></input>
                <input type="Password" placeholder="Password"></input>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default AccountForm;