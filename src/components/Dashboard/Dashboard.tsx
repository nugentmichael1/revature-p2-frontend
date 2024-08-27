import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <>
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Prof Dash</h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white shadow rounded p-4">Student Performance</div>
        <div className="bg-white shadow rounded p-4">Upcoming Assignments</div>
        <div className="bg-white shadow rounded p-4">Messages</div>
        <div className="bg-white shadow rounded p-4">Grades</div>
      </div>
    </div>
    </>
  );
}

export default Dashboard;
