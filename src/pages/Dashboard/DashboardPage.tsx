import React from 'react';

import Dashboard from '../../components/Dashboard/Dashboard.tsx';
import LeftSidebar from '../../components/Dashboard/LeftSidebar.tsx';
import CourseTable from '../../components/Dashboard/CourseTable.tsx';

const DashboardPage: React.FC = () => {

  type Teacher = {
    role: 'teacher';
    name: string;
    subject: string;
    yearsOfExperience: number;
  };
  
  type Student = {
    role: 'student';
    name: string;
    gradeLevel: string;
    gpa: number;
  };
  
  type Person = Teacher | Student;
  

  const teacher1: Person = {
    role: 'teacher',
    name: 'Jane Doe',
    subject: 'Mathematics',
    yearsOfExperience: 10,
  };
  
  const student1: Person = {
    role: 'student',
    name: 'John Smith',
    gradeLevel: '10th Grade',
    gpa: 3.8,
  };
  
  

  return (
      <>
          <div className="flex">
      <LeftSidebar />
      <div className="flex-1 p-6">
          <Dashboard />
          <CourseTable person={student1}/>
      </div>
    </div>
      </> 
  );
}

export default DashboardPage;
