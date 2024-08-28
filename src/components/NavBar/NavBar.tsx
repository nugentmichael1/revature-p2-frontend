import React from 'react';
// import axios from "axios";
import { Link } from "react-router-dom";
import Logo from '../../assets/RevLEarn-Logo.png'
import ProfileIcon from '../../assets/profile-icon.png'
import '../../index.css'
import "./navbar.css";

/**
 * Navbar object component for use on the top of all pages
 * @returns the navbar object
 */

function NavBar() {
  return (
    <> 
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        
        <div className="navbar-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>
        
        <div className="profile-icon">
          <img src={ProfileIcon} alt="Profile" className="profile" />
        </div>
      </nav>
    </>
  );
}

function Navlink(props) {
  return (
    <Link to={props.path} className="navbar-link">
        {props.children}
    </Link>
  );
}

function LogoImage() {
  return (
      <Link to="/">
          <img
              src={Logo}
              alt="RevLearn Logo"
              loading="lazy"
              id="revlearn-logo"
          />
      </Link>
  )
}
function ProfileImage() {
  return (
    <img
        src={ProfileIcon}
        alt="Profile icon"
        loading="lazy"
        id="profile-icon"
    />
  )
}

export default NavBar;
