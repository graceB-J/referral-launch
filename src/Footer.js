//
import React from 'react';

import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import SocialMediaButton from "./profile/TwitterButton";
import "./Footer.css";

export default function TopBar({ match, user }) {
  return (
    <Container fluid className="das-footer">
      <h3 style={{margin: "0", padding: "0"}}>RESHOES</h3>
      <div className="footer-links">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/faq">FAQ</Nav.Link>
          <SocialMediaButton url="https://reshoes-app.web.app/signup" text="Check it out!" />
      </div>
    </Container>
  );
}
