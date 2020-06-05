import React from "react";
import "./About.css";
function About({ match }) {
  console.log(match);
  return (
    <div className="aboutus">
      <h2 className="aboutUsTitle">About Us</h2>
      <div>
        <img src="/hero.png" alt="mother nature made us do it text over a beach landscape" width="100%" />
      </div>
      <div className="body" >
        <p>Our goal is to do better things in a better way. To us, this means making shoes that reflect and respect nature! We’re setting out to make shoes that are durable with the most sustainable materials. In addition, when your shoes are worn through, you can ship them back to us for a $10 credit towards a new pair.</p>
        <p>In addition, we’re committed to providing a pair of shoes to someone in need for every pair we sell. That means a pair of shoes that you buy from us, allows one to be given to a child who needs them! Too often, we have seen how companies and brands don’t care about their impact on the larger population and we are sick of it. We want to start a movement where large corporations are empowered to take action to help others and that start with you, choosing to support brands that are choosing to support the world. Like we love to say, reduce, reuse and Reshoes!</p>

        <h3 className="ourFoundersTitle"> Our Founders </h3>
        <div className="founderphotos">
          <img className="annie" src="/annie-circle.png" alt="annie-founder" width="17%" />
          <img className="annie" src="/camille-circle.png" alt="camille-founder" width="17%" />
        </div>
        <p>Annie and Camille were working in corporate America when they went shopping for shoes and realized that no one was valuing sustainability and positive global impact: everyone else making shoes was worried about turning a profit. They decided to quit their desk jobs to solve this problem once and for all. Since then, they’ve worked with dozens of designers and dozens of manufacturers to find the perfect balance between creating quality designer shoes and environmentally friendly production methods. In addition to this, they want to give back to their communities through this company by donating as many shoes as they can.</p>
      </div>
    </div >
  )
}

export default About;