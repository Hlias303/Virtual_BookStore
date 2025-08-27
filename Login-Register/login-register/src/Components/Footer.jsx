import React from 'react'
import "../Styles/Footer.css"
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
      <div className="footer">
          <div className="socialMedia">
            <Link to = "http://linkedin.com/in/iliaskon123/">
            <LinkedInIcon />
            </Link>
            <Link to = "https://www.facebook.com/hlias.kwstantinidis.9/">
            <FacebookIcon />
            </Link>
            <Link to = "https://www.instagram.com/iliaskon_22">
            <InstagramIcon /> 
            </Link>
          </div>
        <p> &copy; 2025 SpringBoot Project</p>
      </div>
  );
}
