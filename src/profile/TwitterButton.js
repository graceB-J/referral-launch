import React from 'react';

import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon, EmailShareButton, EmailIcon } from 'react-share';

import "./SocialMediaButton.css";

const SocialMediaButton = (props) => (
  <div>
    <TwitterShareButton
      className="socialButton"
      url={props.url}
      title={props.text}>
      <TwitterIcon
        size={35}
        round />
    </TwitterShareButton>
    <FacebookShareButton
      className="socialButton"
      url={props.url}
      quote={props.text}>
      <FacebookIcon
        size={35}
        round />
    </FacebookShareButton>
    <EmailShareButton
      className="socialButton"
      url={props.url}
      quote={props.text}>
      <EmailIcon
        size={35}
        round />
    </EmailShareButton>
  </div>
)

export default SocialMediaButton;