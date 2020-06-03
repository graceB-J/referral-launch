import {TwitterShareButton, TwitterIcon} from 'react-share';
import Button from "react-bootstrap/Button";
import React from 'react';




  const SocialMediaButton = (props) => (
    
  
      <TwitterShareButton
        url={props.url}
        title={props.text}>
        <TwitterIcon
          size={32}
          round />
      </TwitterShareButton>
  
      
  )
  
  export default SocialMediaButton


