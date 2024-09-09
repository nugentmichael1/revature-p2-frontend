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

  // Use functional form to ensure state is updated properly
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const {
    state: { user },
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
                <DropdownMenu setIsDropdownOpen={setIsDropdownOpen} />
              )}
            </div>
          ) : (
            <div>
              <Link to="/login">
                <button className="sign-in-button">Sign In</button>
              </Link>
              <Link to="/register">
                <button className="register-button bg-primary-500">Become a Member</button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

function DropdownMenu({ setIsDropdownOpen }: { setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const {
    state: { user },
    setUser,
  } = useAppContext();

  const logoutUser = () => {
    setIsDropdownOpen(false);
    setUser(null);
    // You might want to add logic for navigating to a different page or clearing more state here
  };

  return (
    <div className="dropdown-menu">
      <ul>
        <li><Link to="/profile">Profile</Link></li>
        {/* <li><Link to="/billing">Billing</Link></li> */}
        <li onClick={logoutUser}>Log Out</li>
      </ul>
    </div>
  );
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
      <Link to="/">Home</Link>
      {user &&
      <Link to="/dashboard">Dashboard</Link>
      }
      <Link to="/courses">Courses</Link>
      <Link to="/contact">Contact</Link>
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