import React from "react";

import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";

import "./MilestonesDisplay.css";

const MilestonesDisplay = () => {
  return (
    <div>
      <h2>Milestone Rewards</h2>
      <CardDeck>
        <Card>
          <Card.Img
            variant="top"
            src={require("./imgs/ms1.png")}
            className="ms-thumb" />
          <Card.Body>
            <Card.Title>Exclusive Facebook Group</Card.Title>
            <Card.Text>10 points</Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img
            variant="top"
            src={require("./imgs/ms2.png")}
            className="ms-thumb" />
          <Card.Body>
            <Card.Title>ReShoes Stickers</Card.Title>
            <Card.Text>25 points</Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img
            variant="top"
            src={require("./imgs/ms3.png")}
            className="ms-thumb" />
          <Card.Body>
            <Card.Title>ReShoes T-Shirt</Card.Title>
            <Card.Text>50 points</Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img
            variant="top"
            src={require("./imgs/ms4.png")}
            className="ms-thumb" />
          <Card.Body>
            <Card.Title>Free Pair of ReShoes</Card.Title>
            <Card.Text>50 points</Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>
    </div>
  );
}

export default MilestonesDisplay;