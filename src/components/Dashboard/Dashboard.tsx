import React from 'react';


const Dashboard: React.FC = () => {
  return (
    <>
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
      <div className="grid grid-cols-4 gap-6 ">
        <div className="bg-sky-600 shadow rounded p-4 text-center">Upcoming Assignments</div>
        <div className="bg-sky-600 shadow rounded p-4 text-center">Student Performance</div>
        <div className="bg-sky-600 shadow rounded p-4 text-center">Messages</div>
        <div className="bg-sky-600 shadow rounded p-4 text-center ">Grades</div>
        </div>
        
    </div>
    </>
  );
}

export default Dashboard;
