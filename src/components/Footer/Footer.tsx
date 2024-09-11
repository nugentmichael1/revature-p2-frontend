import { useState } from 'react';
import { Link } from 'react-router-dom';
import GithubIcon from '../../assets/github-logo.png';

function Footer() {
  const [showTeamInfo, setShowTeamInfo] = useState(false);

  const toggleTeamInfo = () => {
    setShowTeamInfo((prev) => !prev);
  };

  return (
    <footer className="w-full bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-2px_rgba(0,0,0,0.1)] mt-auto border-t border-gray-200">
      <div className="container mx-auto flex flex-wrap justify-between">
        {/* Left Side: Project Info or Our Team */}
        <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
          {!showTeamInfo ? (
            <button
              onClick={toggleTeamInfo}
              className="text-secondary-500 hover:underline text-xs"
            >
              Our Team
            </button>
          ) : (
            <div>
              <p className="text-black text-xs leading-4 mb-2">
                This project was created as our Capstone project for our Java Full Stack Training at Revature
              </p>
              <p className="text-black text-xs leading-4 mb-2">
                Front End: Joshua, Miguel, Diego, Bo Kong, and Bo Bonning
              </p>
              <p className="text-black text-xs leading-4 mb-2">
                Back End Developers: Trey, Michael, Daniel, Megan, and Ralph
              </p>
              <button
                onClick={toggleTeamInfo}
                className="text-secondary-500 hover:underline text-xs mt-2"
              >
                Hide Team Info
              </button>
            </div>
          )}
        </div>

        {/* Center: GitHub Logo */}
        <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
          <a href="https://github.com/Will-Java-FS/revlearn-frontend-team1" target="_blank" rel="noopener noreferrer">
            <img
              src={GithubIcon}
              alt="GitHub Logo"
              className="h-12 mx-auto"
            />
          </a>
        </div>

        {/* Right Side: Contact Info and Links */}
        <div className="w-full md:w-1/3 text-center">
          <div className="flex justify-center space-x-4">
            <Link to="/contactus" className="text-secondary-500 hover:underline text-xs">Contact Us</Link>
            <Link to="/aboutus" className="text-secondary-500 hover:underline text-xs">About Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
