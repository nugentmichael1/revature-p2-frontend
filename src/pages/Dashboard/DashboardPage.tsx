import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../../components/Dashboard/Dashboard';
import LeftSidebar from '../../components/Dashboard/LeftSidebar';
import CourseTable from '../../components/Dashboard/CourseTable';
import { useAppContext } from '../../contexts/AppContext';

const DashboardPage: React.FC = () => {
  const { state } = useAppContext();
  const userRole = state.user?.role;
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!userRole) {
      navigate('/'); 
    }
  }, [userRole, navigate]);

  if (!userRole) {
    return null; 
  }

  return (
    <div className="flex">
      <LeftSidebar />
      <div className="flex-1 p-6">
        <Dashboard />
        <CourseTable role={userRole} />
      </div>
    </div>
  );
}

export default DashboardPage;
