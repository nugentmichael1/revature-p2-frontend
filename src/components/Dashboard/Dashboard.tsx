
import React from 'react';
import { useAppContext } from '../../contexts/AppContext';

const Dashboard: React.FC = () => {
  const { state: { user } } = useAppContext();

  return (
    
    <>
    <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">Welcome {user?.firstName} { user?.lastName}</h1>
      <div className="grid grid-cols-4 gap-6 ">
        <div className="bg-orange-500 text-white shadow rounded p-4 text-center">Upcoming Assignments</div>
        <div className="bg-orange-500 text-white shadow rounded p-4 text-center">Student Performance</div>
        <div className="bg-orange-500 text-white shadow rounded p-4 text-center">Messages</div>
        <div className="bg-orange-500 text-white shadow rounded p-4 text-center ">Grades</div>
        </div>
        
    </div>
    </>
  );
}

export default Dashboard;
