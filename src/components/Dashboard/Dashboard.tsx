import React from 'react';
import CourseTable from './coursetable';

const Dashboard: React.FC = () => {
  return (
    <>
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Prof Dash</h2>
      <div className="grid grid-cols-4 gap-6 ">
        <div className="bg-sky-600 shadow rounded p-4 text-center">Upcoming Assignments</div>
        <div className="bg-sky-600 shadow rounded p-4 text-center">Student Performance</div>
        <div className="bg-sky-600 shadow rounded p-4 text-center">Messages</div>
        <div className="bg-sky-600 shadow rounded p-4 text-center ">Grades</div>
        </div>
        <CourseTable />
    </div>
    </>
  );
}

export default Dashboard;
