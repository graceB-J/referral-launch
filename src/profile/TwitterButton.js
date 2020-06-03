import {TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon, EmailShareButton, EmailIcon} from 'react-share';
import Button from "react-bootstrap/Button";
import React from 'react';




  const SocialMediaButton = (props) => (
    
  <div>
      <TwitterShareButton
        url={props.url}
        title={props.text}>
             <TwitterIcon
            size={35}
            round />
        
      </TwitterShareButton>

    <FacebookShareButton
    url={props.url}
    quote={props.text}>
    <FacebookIcon
            size={35}
            round />
    </FacebookShareButton>
    

    <EmailShareButton
    url={props.url}
    quote={props.text}>
    <EmailIcon
            size={35}
            round />
    </EmailShareButton>
</div>

  
      
  )
  
  export default SocialMediaButton


