import React from 'react';
import "./Landing.css";

function Landing({ match }) {
    return (
        <div className="landing">
            <div>
                <img src="/landing.png" alt="Reshoes. shoes rethought, shoes reused" width="100%" />
            </div>
            <div>
                <img src="/comingsoon.png" alt="Coming Soon" width="100%" />
            </div>
            <div>
                <h3>
                    <a href="/signup" >Sign Up. </a>
                Share with Friends. Get Rewards.
                </h3>
            </div>
        </div>
    )

}

export default Landing;