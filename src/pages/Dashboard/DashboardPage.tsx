import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../../components/Dashboard/Dashboard';
import LeftSidebar from '../../components/Dashboard/LeftSidebar';
import CourseTable from '../../components/Dashboard/CourseTable';
import { useAppContext } from '../../contexts/AppContext';

const DashboardPage: React.FC = () => {
  const { state } = useAppContext();
  const userRole = state.user?.role;
  const userId = state.user?.id;
  const navigate = useNavigate();
  // console.log(state.user);

  useEffect(() => {
    if (!userRole) {
      navigate('/');
    }
  }, [userRole, navigate]);

  if (!userRole) {
    return null;
  }

  const handleClick = () => {
    navigate('/createcourse');
  };

  return (
    <div className='flex'>
      <LeftSidebar
        firstName={state.user?.firstName}
        lastName={state.user?.lastName}
        role={userRole}
      />
      <div className='flex-1 p-6'>
        <Dashboard />
        <CourseTable role={userRole} id={userId} />

        {userRole !== 'STUDENT' && (
          <div className='mt-4 text-right'>
            <button
              onClick={handleClick}
              className='rounded bg-orange-500 px-5 py-2 text-white hover:bg-sky-500'
            >
              Create Course
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
