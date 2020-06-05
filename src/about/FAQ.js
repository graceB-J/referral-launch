import React from "react";

import Container from 'react-bootstrap/Container';
import Card from "react-bootstrap/Card";
import CardColumns from 'react-bootstrap/CardColumns';

import "./FAQ.css"

function FAQ(props) {
  return (
    <Container style={{ textAlign: "center" }}>
      <h2 style={{ paddingTop: "20px" }}>Frequently Asked Questions (FAQ)</h2>
      <CardColumns>
        <Card>
          <Card.Body>
            <Card.Title>Q: Why ReShoes? </Card.Title>
            <Card.Text>
              A: We, unlike a lot of other brands, care about where and how we are making our shoes and the quality of our
              products for our consumers and the planet. A purchase from
              us is one you can count on to be a good choice for your footprint on the world.
              </Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>Q: What are the milestones? </Card.Title>
            <Card.Text>
              A: After 10 people sign up with your referral code, you’ll receive an invite for our exclusive Facebook group. After 25 people sign up with your code, you’ll get a free sticker pack with ReShoes branded stickers. After 50, you’ll get a free t-shirt, and after 100, you’ll get a new pair of our upcoming shoes! Beyond that, the rewards are a mystery: you’ll only know if you get there!
              </Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>Q: Will I lose all my points if I reach a milestone and want the item? </Card.Title>
            <Card.Text>
              A: No you will not lose all your points. After reaching a milestone, customers will receive the milestone’s respective item. For instance, if you reach the first milestone with 10 points, you will still have your 10 points.
                        </Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>Q: When are you releasing your first line of shoes?!</Card.Title>
            <Card.Text>
              A: The current release date has not been set, but if you sign up for an account, we'll make sure you're the first to know when you can
              get our awesome shoes!
              </Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>Q: Does your company detect spam accounts in regards to your referral program?</Card.Title>
            <Card.Text>
              A: Yes! Our company strives to expand so we can make our world a little better by donating shoes to charity for every pair that a customer purchases, therefore we hope that this referral program will bring in new customers.
              </Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>Q: Where is ReShoes based?</Card.Title>
            <Card.Text>
              A: ReShoes is based in Charlottesville, VA, in the the United States. Here,
              we pay laborers a fair, liveable minimum wage of $16/hour.
              </Card.Text>
          </Card.Body>
        </Card>
      </CardColumns>
    </Container>
  )
}

export default FAQ;