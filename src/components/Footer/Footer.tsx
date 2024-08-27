import React from 'react';
// import axios from "axios";
import { Link } from "react-router-dom";
// import GithubIcon from '../../assets/github-logo.png'
import '../../index.css'
import "./Footer.css"

/**
 *
 * Defines the footer found at the bottom of each webpage. The footer
 * contains extra links for providing the users with extra information
 * and an additional way to navigate the website.
 *
 * Footer with columns and rows containing supplemental links
 * @returns The footer component
 */

function Footer() {
  return (
    <> 
      <footer className="footer">
        <div className="footer-column-side">
          <p>Blahblahblah</p>
          <p>Blaaaaaaaa</p>
          <p>words and stuff</p>

        </div>

        <div className="footer-column-middle">
          <GithubLink path="https://github.com/Will-Java-FS/revlearn-frontend-team1">Our Github</GithubLink>
        </div>

        <div className="footer-column-side">
          <p>Contact us: email here</p>
        </div>
      </footer>
    </>
  );
}

function GithubLink(props) {
  return (
    <Link to={props.path} className="github-link" target="_blank">
        {props.children}
    </Link>
  );
}

// function GithubImage() {
//   return (
//       <Link to="https://github.com/Will-Java-FS/revlearn-frontend-team1" target="_blank">
//           <img
//               src={GithubIcon}
//               alt="Github Icon"
//               loading="lazy"
//               id="github-icon"
//           />
//       </Link>
//   )
// }

export default Footer;