import React from "react";
import "./About.css";
function About({ match }, props) {
    console.log(match);
    return (
        < div className="aboutus" >
            <div className="head">
                About Us
            </div>
            <body>
                The journey to making better things in a better way is a long one, and we’re just getting started.
            </body>

        </div >
    )
}

export default About;