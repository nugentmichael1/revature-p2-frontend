import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { User } from "../../types/user"

// import axios from "axios";
import Logo from '../../assets/RevLEarn-Logo.png'
import ProfileIcon from '../../assets/profile-icon.png'
import '../../index.css'
import "./navbar.css";

/**
 * Navbar object component for use on the top of all pages
 * @returns the navbar object
 */
function NavBar() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {setIsDropdownOpen(!isDropdownOpen);};

  const [user, setUser] = useState(1);

  return (
    <> 
      <nav className="navbar">
        <NavBarLogo />
        
        <NavBarLinks />
        
        <div className="navbar-profile" onClick={toggleDropdown}>
          {user ? (
            <div className="profile-icon">
              <ProfileImage />
              {isDropdownOpen && (
                <DropdownMenu />
              )}
            </div>
          ):(
            <div>
              <Link to="/register"><button className="sign-in-button">Sign In</button></Link>
              <Link to="/register"><button className="register-button bg-primary-500">Become a Member</button></Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

function DropdownMenu() {
  return (
    <div className="dropdown-menu">
    <ul>
      <a href="/profile"><li>Profile</li></a>
      <a href="/billing"><li>Billing</li></a>
    </ul>
  </div>
  )
}

function NavBarLogo() {
  return (
    <div className="navbar-logo">
      <Link to="/"><img src={Logo} alt="Logo" className="logo" /></Link>
    </div>
  )
}

function NavBarLinks() {
  return (
    <div className="navbar-links">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/services">Services</a>
      <a href="/contact">Contact</a>
    </div>
  )
}

function ProfileImage() {
  return (
    <img
        src={ProfileIcon}
        alt="Profile icon"
        loading="lazy"
        className="profile-image"
    />
  )
}

export default NavBar;