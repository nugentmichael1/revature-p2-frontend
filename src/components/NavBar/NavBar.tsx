import { Link } from "react-router-dom";
import { useAppContext } from '../../contexts/AppContext';
import { useEffect, useState } from 'react';
// import axios from "axios";
import Logo from '../../assets/RevLEarn-Logo.png'
import ProfileIcon from '../../assets/profile-icon.png'
import '../../index.css'
import "./NavBar.css";

/**
 * Navbar object component for use on the top of all pages
 * @returns the navbar object
 */
function NavBar() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {setIsDropdownOpen(!isDropdownOpen);};

  const {
    state: { user },
    setUser,
  } = useAppContext();

  return (
    <> 
      <nav className="navbar">
        <NavBarLogo />
        
        <NavBarLinks />
        
        <div className="navbar-profile" onClick={toggleDropdown}>
          {user && user.username ? (
            <div className="profile-icon">
              <ProfileImage />
              {isDropdownOpen && (
                <DropdownMenu />
              )}
            </div>
          ):(
            <div>
              <Link to="/login"><button className="sign-in-button">Sign In</button></Link>
              <Link to="/register"><button className="register-button bg-primary-500">Become a Member</button></Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

function DropdownMenu() {
  const {
    state: { user },
    setUser,
  } = useAppContext();

  const logoutUser = () => {setUser(null);};

  return (
    <div className="dropdown-menu">
    <ul>
      <a href="/profile"><li>Profile</li></a>
      <a href="/billing"><li>Billing</li></a>
      <a href="/" onClick={logoutUser}><li>Log Out</li></a>
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
  const {
    state: { user }
  } = useAppContext();
  return (
    <div className="navbar-links">
      <a href="/">Home</a>
      {user &&
      <a href="/dashboard">Dashboard</a>
      }
      <a href="/courses">Courses</a>
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