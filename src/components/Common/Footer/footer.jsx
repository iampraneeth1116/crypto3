import React from "react";
import "./styles.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

function Footer() {
  function topFunction() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  }
  return (
    <div className="footer">
      <h2 className="logo" onClick={() => topFunction()}>
        CryptoTracker<span>.</span>
      </h2>
      <div className="social-links">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FacebookIcon className="social-link" />
        </a>
        <a href="mailto:iampraneeth1116@gmail.com">
          <EmailIcon className="social-link" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <TwitterIcon className="social-link" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <InstagramIcon className="social-link" />
        </a>
      </div>
    </div>
  );
}

export default Footer;