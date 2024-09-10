import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from '../../contexts/AppContext';
import { useState } from 'react';
import Logo from '../../assets/RevLEarn-Logo.png';
import ProfileIcon from '../../assets/profile-icon.png';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

/**
 * Navbar object component for use on the top of all pages
 * @returns the navbar object
 */
function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const {
    state: { user },
    setUser,
  } = useAppContext();
  const nav = useNavigate();

  const logoutUser = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setUser(null);
    nav('/');
  };

  return (
    <>
      <nav className="flex items-center py-2 px-5 bg-white relative z-20 shadow-lg">
        <div className="flex justify-between w-full items-center">
          {/* Mobile Hamburger or Logo */}
          <div className="flex items-center">
            {/* If the screen is small, show the hamburger menu */}
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="text-3xl">
                {isMobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
              </button>
            </div>
            {/* Show the logo on medium screens and larger */}
            <div className="hidden md:block">
              <NavBarLogo />
            </div>
          </div>

          {/* Desktop Links */}
          <NavBarLinks />

          {/* Profile Dropdown */}
          <div className="relative ml-auto cursor-pointer" onClick={toggleDropdown}>
            {user && user.username ? (
              <div className="h-20 w-20">
                <ProfileImage />
                {isDropdownOpen && <DropdownMenu logoutUser={logoutUser} />}
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login">
                  <button className="text-black border-none py-2 px-5 rounded-md font-bold transition-colors hover:bg-gray-200">
                    Sign In
                  </button>
                </Link>
                <Link to="/register">
                  <button className="text-white bg-primary-500 py-2 px-5 rounded-md font-bold transition-colors hover:bg-gray-400">
                    Become a Member
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu (Hamburger) */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50 md:hidden">
            <div className="flex flex-col items-start p-4">
              <Link to="/" className="mb-2 font-bold text-orange-500 no-underline">Home</Link>
              {user && <Link to="/dashboard" className="mb-2 font-bold text-orange-500 no-underline">Dashboard</Link>}
              <Link to="/courses" className="mb-2 font-bold text-orange-500 no-underline">Courses</Link>
              <Link to="/contactus" className="mb-2 font-bold text-orange-500 no-underline">Contact</Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

function DropdownMenu({ logoutUser }: { logoutUser: () => void }) {
  return (
    <div className="absolute top-[calc(100%+5px)] right-0 bg-white text-black shadow-md rounded-md min-w-[150px] z-50">
      <ul className="list-none">
        <Link to="/profile">
          <li className="py-2 pl-3 font-bold cursor-pointer hover:bg-gray-100">Profile</li>
        </Link>
        <li onClick={logoutUser} className="py-2 pl-3 font-bold cursor-pointer hover:bg-gray-100">
          Log Out
        </li>
      </ul>
    </div>
  );
}

function NavBarLogo() {
  return (
    <div className="pl-6">
      <Link to="/"><img src={Logo} alt="Logo" className="h-20" /></Link>
    </div>
  );
}

function NavBarLinks() {
  const {
    state: { user }
  } = useAppContext();
  
  return (
    <div className="ml-6 hidden md:flex">
      <Link to="/" className="ml-5 font-bold text-orange-500 no-underline">Home</Link>
      {user && <Link to="/dashboard" className="ml-5 font-bold text-orange-500 no-underline">Dashboard</Link>}
      <Link to="/courses" className="ml-5 font-bold text-orange-500 no-underline">Courses</Link>
      <Link to="/contactus" className="ml-5 font-bold text-orange-500 no-underline">Contact</Link>
    </div>
  );
}

function ProfileImage() {
  return (
    <img
      src={ProfileIcon}
      alt="Profile icon"
      loading="lazy"
      className="h-20 w-20 rounded-full"
    />
  );
}

export default NavBar;
