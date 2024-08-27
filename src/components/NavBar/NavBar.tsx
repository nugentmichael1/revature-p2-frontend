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
          <LogoImage />

          <div className="navbar-links">
            <Navlink path="/"> Home </Navlink>
            <Navlink path="/advantages"> Advantages </Navlink>
            <Navlink path="/classes"> Our Classes </Navlink>
            <Navlink path="/contact"> Contact </Navlink>
          </div>

          <ProfileMenu />
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

function ProfileMenu() {
  return (
    <> 
      <ProfileImage />
    </>
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
