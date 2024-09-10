import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaBook, FaCreditCard, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface LeftSidebarProps {
  firstName: string | undefined;
  lastName: string | undefined;
  role: string | undefined;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ firstName, lastName, role }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const nav = useNavigate();
  const handlecoursebttn = () => {
    nav('/courses');
  };
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`h bg-white p-4 flex flex-col shadow-lg ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${isCollapsed ? 'hidden' : ''}`}>
          Dashboard
        </h1>
        <button onClick={toggleSidebar} className="focus:outline-none">
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      <div className="flex-grow">
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
            {!isCollapsed && <span><button onClick={handlecoursebttn}>Courses</button></span>}
          </li>
          <li className="flex items-center text-gray-600 hover:text-purple-600">
            <FaCreditCard className="mr-3" />
            {!isCollapsed && <span>Payment</span>}
          </li>
        </ul>
      </div>

      {!isCollapsed && (
        <div className="flex-shrink-0">
          {/* User Info */}
          <div className="flex items-center mt-5">
            <img
              className="w-10 h-10 rounded-full mr-3"
              src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/6e61b/MainAfter.avif"
              alt="User avatar"
            />
            <div>
              <h4 className="text-md font-semibold">{firstName + ' ' + lastName}</h4>
              <p className="text-gray-500 text-sm">{role!.substring(1, 0) + role!.substring(1)?.toLowerCase()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftSidebar;
