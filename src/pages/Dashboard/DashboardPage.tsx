import React from 'react';

import Dashboard from '../../components/Dashboard/Dashboard.tsx';
import LeftSidebar from '../../components/Dashboard/LeftSidebar.tsx';
import CourseTable from '../../components/Dashboard/coursetable.tsx';

const DashboardPage: React.FC = () => {
  return (
      <>
          <div className="flex">
      <LeftSidebar />
      <div className="flex-1 p-6">
          <Dashboard />
          <CourseTable />
      </div>
    </div>
      </> 
  );
}

export default DashboardPage;
