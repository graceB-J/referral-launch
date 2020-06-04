//
import React from 'react';

import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import SocialMediaButton from "./profile/TwitterButton";
import "./Footer.css";
//

export default function TopBar({ match, user }) {
    return (
        <Navbar>
        <div className="footer">
            

            <h5 class="font-weight-bold text-uppercase mb-4"> ReShoes </h5>
            <div className = "content">
            <Nav.Link href="/">Home</Nav.Link>     
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/faq">FAQ</Nav.Link>
            <SocialMediaButton url="https://reshoes-app.web.app/signup" text="Check it out!" />
            </div>
        </div>
        </Navbar>
    );
}
