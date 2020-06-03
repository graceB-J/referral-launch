import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

const TopBar = ({ match, user, logout }) => {
  console.log(user);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <img
          alt=""
          src="/image.png"
          width="75"
          height="55"
          className="d-inline-block align-top"
        />
        <div>ReShoes</div>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {
            user &&
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          }
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/faq">FAQ</Nav.Link>
        </Nav>

        {user
          ? <Button
            variant="outline-success"
            onClick={logout}
            id='logout'>
            Log Out
            </Button>
          : [<Button variant="outline-success"><Link to="/signin">Sign In</Link></Button>,
          <Button variant="outline-success"><Link to="/signup">Sign Up</Link></Button>]}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default TopBar;