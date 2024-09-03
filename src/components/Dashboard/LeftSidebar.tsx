import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaBook, FaCreditCard, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const LeftSidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`h-screen bg-white p-10 flex flex-col justify-around shadow-lg ${isCollapsed ? 'w-30' : 'w-4064'} transition-all duration-300`}>
      <div>
        <div className="flex justify-between items-center mb-10">
          <h1 className={`text-2xl font-bold flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
            {!isCollapsed && "Dashboard"} <span className="text-gray-500 ml-1 text-sm">{!isCollapsed}</span>
          </h1>
          <button onClick={toggleSidebar} className="focus:outline-none">
            {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>


        <ul className="space-y-4">
          <li className="flex items-center text-gray-600 hover:text-purple-600">
            <FaUser className="mr-3" />
            {!isCollapsed && <span>Profile</span>}
          </li>
          <li className="flex items-center text-gray-600 hover:text-purple-600">
            <FaEnvelope className="mr-3" />
            {!isCollapsed && <span>Mail</span>}
          </li>
          <li className="flex items-center text-gray-600 hover:text-purple-600">
            <FaBook className="mr-3" />
            {!isCollapsed && <span>Courses</span>}
          </li>
          <li className="flex items-center text-gray-600 hover:text-purple-600">
            <FaCreditCard className="mr-3" />
            {!isCollapsed && <span>Payment</span>}
          </li>
        </ul>
      </div>

      {!isCollapsed && (
        <div>
          {/* User Info */}
          <div className="flex items-center mt-5">
            <img
              className="w-10 h-10 rounded-full mr-3"
              src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/6e61b/MainAfter.avif"
              alt="User avatar"
            />
            <div>
              <h4 className="text-md font-semibold">William</h4>
              <p className="text-gray-500 text-sm">Project Manager</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftSidebar;
